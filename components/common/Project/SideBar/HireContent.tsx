import {twMerge} from 'tailwind-merge';
import ApplicationByStatus from '../../../organisms/projects/ApplicantsByStatus';

type HireContentProps = {
  projectId: string;
  type?: 'FULL';
};

function HiredContent({projectId, type}: HireContentProps) {
  return (
    <div className={type === 'FULL' ? 'w-full' : 'py-4'}>
      <div
        className={twMerge(
          'my-4 rounded-2xl border border-grayLineBased bg-white',
          type === 'FULL' && 'my-0 w-full',
        )}
      >
        <ApplicationByStatus
          projectId={projectId}
          status={['HIRED', 'APPROVED']}
          goTo={'HIRED'}
          title="Hired"
        />
        {/* TODO:// CHANGE BASED ON MISSION SCHEMA */}
        <ApplicationByStatus
          projectId={projectId}
          status={'MISSION'}
          goTo={'HIRED'}
          title="End-Hired"
          rounded={false}
        />
      </div>
    </div>
  );
}

export default HiredContent;
