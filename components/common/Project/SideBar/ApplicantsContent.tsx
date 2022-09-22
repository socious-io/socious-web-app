import Button from '@components/common/Button/Button';
import CardBoxComplete from '@components/common/CardBoxComplete/CardBoxComplete';
import TextBoxGray from '@components/common/TextBoxGray/TextBoxGray';
import TitleViewBoxWithCard from '@components/common/TitleViewBoxWithAvatar/TitleViewBoxWithAvatar';
import TwoCloumnTwoRowBox from '@components/common/TwoColumnTwoRow/TwoColumnTwoRow';
import {useToggle, useUser} from '@hooks';

import BodyCard from '../component/BodyCard';
import HeaderBox from '../component/HeaderBox';
import HiredCard from '../component/HiredCard';

var data = [
  {
    id: 1,
    projectId: '1',
  },
  {
    id: 2,
    projectId: '2',
  },
];
var data2 = [
  {
    id: 1,
    projectId: '1',
  },
];
function ApplicantsContent() {
  const {state: showOnGoing, handlers: showOnGoingHandler} = useToggle();
  const {state: showDrafts, handlers: showDraftsHandler} = useToggle();
  const {user} = useUser();

  return (
    <div className="w-full bg-white py-4">
      <div className=" rounded-2xl border border-grayLineBased ">
        <HeaderBox
          title={'to review'}
          isExpand={showOnGoing}
          expandToggle={showOnGoingHandler.toggle}
          isExpandable={true}
          isRound={false}
        />
        {data.map((item) => (
          <CardBoxComplete
            key={item.id}
            bodyTitle={'Apply date'}
            description={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
            }
            bodyTitleColor={'text-graySubtitle'}
          />
        ))}

        <div className="w-full rounded-2xl border border-grayLineBased bg-white ">
          <HeaderBox
            isRound={false}
            title={'saved'}
            isExpand={showOnGoing}
            expandToggle={showOnGoingHandler.toggle}
            isExpandable={true}
          />
          {showOnGoing &&
            data2.map((item) => (
              <CardBoxComplete
                key={item.id}
                bodyTitle={'Apply date'}
                description={
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
                }
                bodyTitleColor={'text-graySubtitle'}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ApplicantsContent;
