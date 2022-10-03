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
];

function HiredProjectsBoxes() {
  const {state: showOnGoing, handlers: showOnGoingHandler} = useToggle();
  const {state: showCompleted, handlers: showCompletedHandler} = useToggle();

  return (
    <div className="w-full">
      <div className="mb-4 w-full space-y-6  rounded-2xl border border-grayLineBased bg-white p-6 shadow-sm">
        <span className="font-worksans text-xl font-semibold">
          Hired Projects
        </span>
      </div>
      <div className="w-full">
        <div className="w-full rounded-2xl border border-grayLineBased">
          <HeaderBox
            title={`On-Going (${data.length})`}
            isExpand={showOnGoing}
            expandToggle={showOnGoingHandler.toggle}
            isExpandable={true}
            isRound={true}
            isLastItem={false}
          />
          {showOnGoing &&
            data.map((item) => (
              <BodyCard
                key={item.id}
                refixAddress={`/app/projects/hired/section/${item.projectId}`}
              />
            ))}
          <HeaderBox
            title={`Completed (${data2.length})`}
            isExpand={showCompleted}
            expandToggle={showCompletedHandler.toggle}
            isExpandable={true}
            isRound={true}
            isLastItem
          />
          {showCompleted &&
            data2.map((item) => (
              <BodyCard
                key={item.id}
                refixAddress={`/app/projects/hired/section/${item.projectId}`}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default HiredProjectsBoxes;
