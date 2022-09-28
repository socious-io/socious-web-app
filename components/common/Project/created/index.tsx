import Button from '@components/common/Button/Button';
import {useToggle, useUser} from '@hooks';
import BodyCard from '../component/BodyCard';
import HeaderBox from '../component/HeaderBox';
import HiredCard from '../component/HiredCard';
import {PlusIcon} from '@heroicons/react/24/solid';
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
    <div className="w-2/3 pb-4">
      <div className="flex items-center rounded-2xl border border-grayLineBased bg-white p-6">
        <p className="text-xl font-semibold">Created Project</p>
      </div>
      <Button
        className="my-6 flex w-52 items-center justify-center align-middle "
        type="submit"
        size="md"
        variant="fill"
        value="Submit"
        leftIcon={() => <PlusIcon width={20} height={20} />}
        //disabled={!!formState?.errors}
      >
        Create Project
      </Button>
      <div className="w-full space-y-4 rounded-t-2xl border border-grayLineBased ">
        <HeaderBox
          isRound={true}
          title={'onGoing'}
          isExpand={true}
          expandToggle={showOnGoingHandler.toggle}
          isExpandable={false}
        />
        {data.map((item) => (
          <BodyCard
            key={item.id}
            refixAddress={`/app/projects/created/overview/${user?.username}`}
          />
        ))}
        <HeaderBox
          isRound={false}
          title={'Drafts  3'}
          isExpand={showDrafts}
          expandToggle={showDraftsHandler.toggle}
          isExpandable={true}
        />
        {showDrafts &&
          data2.map((item) => (
            <BodyCard
              key={item.id}
              refixAddress={`/app/projects/created/overview/${user?.username}}`}
            />
          ))}
      </div>
    </div>
  );
}

export default MyApplicationBoxes;
