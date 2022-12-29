import {twMerge} from 'tailwind-merge';
import OfferByStatus from '../../../organisms/projects/OffersByStatus';

type OfferContentProps = {
  projectId: string;
  type?: 'FULL';
};

function OffersContent({projectId, type}: OfferContentProps) {
  return (
    <div className={type === 'FULL' ? 'w-full' : 'py-4'}>
      <div
        className={twMerge(
          'my-4 rounded-2xl border border-grayLineBased bg-white ',
          type === 'FULL' && 'my-0 w-full',
        )}
      >
        <OfferByStatus
          projectId={projectId}
          status={'PENDING'}
          title={'Sent'}
        />
        <OfferByStatus
          projectId={projectId}
          status={'APPROVED'}
          title={`Approved`}
          rounded={false}
        />
        <OfferByStatus
          projectId={projectId}
          status={'HIRED'}
          title={`Hired`}
          rounded={false}
        />
        <OfferByStatus
          projectId={projectId}
          status={['CLOSED', 'CANCELED', 'WITHDRAWN']}
          title={`Closed`}
          rounded={false}
        />
      </div>
    </div>
  );
}

export default OffersContent;
