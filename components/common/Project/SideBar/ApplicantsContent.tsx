import {twMerge} from 'tailwind-merge';
import ApplicationByStatus from '../../../organisms/projects/ApplicantsByStatus';

type ApplicantsContentProps = {
  projectId: string;
  type?: 'FULL';
};

function ApplicantsContent({projectId, type}: ApplicantsContentProps) {
  return (
    <div className={type === 'FULL' ? 'w-full' : 'py-4'}>
      {/* TODO :Add Menu if type==="FULL" */}
      <div
        className={twMerge(
          'my-4 rounded-2xl border border-grayLineBased bg-white ',
          type === 'FULL' && 'my-0 w-full',
        )}
      >
        <ApplicationByStatus
          projectId={projectId}
          status={'PENDING'}
          title={'To review'}
        />
        <ApplicationByStatus
          projectId={projectId}
          status={'OFFERED'}
          title={`Saved`}
          rounded={false}
        />
        <ApplicationByStatus
          projectId={projectId}
          status={'REJECTED'}
          title={`Declined`}
          rounded={false}
        />
      </div>
    </div>
  );
}

export default ApplicantsContent;
