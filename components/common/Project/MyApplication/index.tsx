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
function MyApplicationBoxes() {
  const {state: showPending, handlers: showPendingHandler} = useToggle();
  const {state: showDecline, handlers: showDeclineHandler} = useToggle();
  const {state: showAwaiting, handlers: showAwaitingHandler} = useToggle();

  return (
    <div className="w-full rounded-2xl border border-grayLineBased pb-4 ">
      <HeaderBox
        title={'pending'}
        isExpand={showPending}
        expandToggle={showPendingHandler.toggle}
        isExpandable={true}
        isRound={true}
      />
      {showPending &&
        data.map((item) => (
          <BodyCard
            key={item.id}
            refixAddress={`/app/projects/applications/section/${item.projectId}`}
          />
        ))}
      <HeaderBox
        title={'Awaiting review 3'}
        isExpand={showAwaiting}
        expandToggle={showAwaitingHandler.toggle}
        isExpandable={true}
        isRound={true}
      />
      {showAwaiting &&
        data2.map((item) => (
          <BodyCard
            key={item.id}
            refixAddress={`/app/projects/applications/section/${item.projectId}`}
          />
        ))}
      <HeaderBox
        title={'Declined'}
        isExpand={showDecline}
        expandToggle={showDeclineHandler.toggle}
        isExpandable={true}
        isRound={true}
      />
      {showDecline &&
        data3.map((item) => (
          <BodyCard
            key={item.id}
            refixAddress={`/app/projects/applications/section/${item.projectId}`}
          />
        ))}
    </div>
  );
}

export default MyApplicationBoxes;
