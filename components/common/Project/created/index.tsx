import Button from '@components/common/Button/Button';
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
function MyApplicationBoxes() {
  const {state: showOnGoing, handlers: showOnGoingHandler} = useToggle();
  const {state: showDrafts, handlers: showDraftsHandler} = useToggle();
  const {user} = useUser();
  return (
    <div className="w-full pb-4 ">
      <div className="flex items-center rounded-2xl border border-grayLineBased bg-white p-6">
        <p className="font-semibold">created project</p>
      </div>
      <Button
        className=" m-6  flex  max-w-xs items-center justify-center align-middle "
        type="submit"
        size="lg"
        variant="fill"
        value="Submit"
        //disabled={!!formState?.errors}
      >
        Create Project
      </Button>
      <div className="w-full rounded-2xl border border-grayLineBased">
        <HeaderBox
          isRound={true}
          title={'onGoing'}
          isExpand={showOnGoing}
          expandToggle={showOnGoingHandler.toggle}
          isExpandable={true}
        />
        {showOnGoing &&
          data.map((item) => (
            <BodyCard
              key={item.id}
              refixAddress={`/app/projects/created/overview/${user.username}`}
            />
          ))}
        <HeaderBox
          isRound={true}
          title={'Drafts  3'}
          isExpand={showDrafts}
          expandToggle={showDraftsHandler.toggle}
          isExpandable={true}
        />
        {showDrafts &&
          data2.map((item) => (
            <BodyCard
              key={item.id}
              refixAddress={`/app/projects/created/overview/${user.username}}`}
            />
          ))}
      </div>
    </div>
  );
}

export default MyApplicationBoxes;
