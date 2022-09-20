import {useToggle} from '@hooks';
import BodyCard from '../component/BodyCard';
import HeaderBox from '../component/HeaderBox';
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

function HiredProjectsBoxes() {
  const {state: showPending, handlers: showPendingHandler} = useToggle();
  const {state: showDecline, handlers: showDeclineHandler} = useToggle();
  const {state: showAwaiting, handlers: showAwaitingHandler} = useToggle();

  return (
    <div className="w-full rounded-2xl border border-grayLineBased pb-4 ">
      <HeaderBox
        title={'pending'}
        isExpand={showPending}
        expandToggle={showPendingHandler.toggle}
      />
      {data.map((item) => (
        <div>
          <BodyCard
            refixAddress={`/app/projects/hired/section/${item.projectId}`}
          />
        </div>
      ))}
      <HeaderBox
        title={'Awaiting review 3'}
        isExpand={showAwaiting}
        expandToggle={showAwaitingHandler.toggle}
      />
      {showAwaiting &&
        data2.map((item) => (
          <BodyCard
            refixAddress={`/app/projects/hired/section/${item.projectId}`}
          />
        ))}
      <HeaderBox
        title={'Declined'}
        isExpand={showDecline}
        expandToggle={showDeclineHandler.toggle}
      />
    </div>
  );
}

export default HiredProjectsBoxes;
