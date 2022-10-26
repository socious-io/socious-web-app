import Button from '@components/common/Button/Button';
import {useToggle, useUser} from '@hooks';
import HeaderBox from '../component/HeaderBox';
import {PlusIcon} from '@heroicons/react/24/solid';
import {FC} from 'react';
import {useProjectContext} from '../created/NewProject/context';
import ProjectsByStatus from '../ProjectsByStatus/ProjectByStatus';

const MyApplicationBoxes: FC = () => {
  const {currentIdentity} = useUser();
  const {ProjectContext, setProjectContext} = useProjectContext();

  return (
    <div className="w-full pb-4 sm:w-2/3">
      <div className="flex items-center rounded-2xl border border-grayLineBased bg-white p-6">
        <p className="text-xl font-semibold">Created Projects</p>
      </div>
      <Button
        disabled={currentIdentity?.type === 'users'}
        className="my-6 flex w-52 items-center justify-center align-middle "
        type="submit"
        size="md"
        variant="fill"
        value="Submit"
        leftIcon={() => <PlusIcon width={20} height={20} />}
        onClick={() =>
          setProjectContext({
            ...ProjectContext,
            isModalOpen: !ProjectContext.isModalOpen,
          })
        }
      >
        Create Project
      </Button>
      <div className="w-full space-y-4 rounded-t-2xl border border-grayLineBased ">
        <ProjectsByStatus
          identityId={currentIdentity?.id ?? ''}
          status={'ACTIVE'}
          title={'On-going'}
        />
        <ProjectsByStatus
          identityId={currentIdentity?.id ?? ''}
          status={'DRAFT'}
          title={`Draft`}
          rounded={false}
        />
      </div>
    </div>
  );
};

export default MyApplicationBoxes;
