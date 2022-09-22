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

function HiredContent() {
  const {state: showOnGoing, handlers: showOnGoingHandler} = useToggle();
  const {state: showDrafts, handlers: showDraftsHandler} = useToggle();
  const {user} = useUser();

  return (
    <div className="w-full py-4">
      <div className=" rounded-2xl border border-grayLineBased ">
        <HeaderBox
          title={'Hired'}
          isExpand={showOnGoing}
          expandToggle={showOnGoingHandler.toggle}
          isExpandable={false}
          isRound={false}
        />
        <TitleViewBoxWithCard />
        <TwoCloumnTwoRowBox />
        <HiredCard hasButtons={false} />

        <div className="w-full rounded-2xl border border-grayLineBased bg-white ">
          <HeaderBox
            isExpandable={true}
            isRound={false}
            title={'End hire'}
            isExpand={showOnGoing}
            expandToggle={showOnGoingHandler.toggle}
          />
          {showOnGoing &&
            data.map((item) => (
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

export default HiredContent;
