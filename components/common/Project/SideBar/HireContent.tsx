import Button from '@components/common/Button/Button';
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
  {
    id: 3,
    projectId: '3',
  },
];
var data2 = [
  {
    id: 1,
    projectId: '1',
  },
  {
    id: 2,
    projectId: '2',
  },
  {
    id: 3,
    projectId: '3',
  },
];
var data3 = [
  {
    id: 1,
    projectId: '1',
  },
  {
    id: 2,
    projectId: '2',
  },
  {
    id: 3,
    projectId: '3',
  },
];
function HiredContent() {
  const {state: showOnGoing, handlers: showOnGoingHandler} = useToggle();
  const {state: showDrafts, handlers: showDraftsHandler} = useToggle();
  const {user} = useUser();

  return (
    <div className="w-full pb-4 ">
      <TitleViewBoxWithCard />
      <TwoCloumnTwoRowBox />
      <HiredCard hasButtons={false} />
      {/* <div className=" divide-y rounded-2xl border border-grayLineBased bg-white ">
        <div className=" divide-y p-4 ">
          <p className="py-4 font-semibold text-black">Cover Letter</p>
          <div>
            <p className=" flex py-4 font-medium text-gray-900">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Equat
              faucibus sed facilisi sit id blandiacilisi sit id blandit... See
              more
            </p>
            <p className="py-4 font-semibold text-black">Screening questions</p>
          </div>
          <div>
            {data.map((e) => (
              <div key={e.id} className="my-4 flex flex-col">
                <p className="text-black">Question1</p>
                <p className="text-graySubtitle">Question</p>
              </div>
            ))}
            <p className="py-4 font-semibold text-black">Contact Info</p>
          </div>

          <div>
            <p className=" flex py-4 font-medium text-gray-900">
              Your contact information (email, phone & address) will be shared
              with Organization.
            </p>
          </div>
        </div>
      </div> */}
      <div className="w-full rounded-2xl border border-grayLineBased">
        <HeaderBox
          title={'onGoing'}
          isExpand={showOnGoing}
          expandToggle={showOnGoingHandler.toggle}
        />
        {showOnGoing &&
          data.map((item) => (
            <BodyCard
              key={item.id}
              refixAddress={`/app/projects/created/overview/${user.username}`}
            />
          ))}
        <HeaderBox
          title={'Drafts  3'}
          isExpand={showDrafts}
          expandToggle={showDraftsHandler.toggle}
        />
      </div>
    </div>
  );
}

export default HiredContent;
