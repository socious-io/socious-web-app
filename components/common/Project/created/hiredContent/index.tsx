import {TApplicant} from '@models/applicant';
import HiredCard from '../../component/HiredCard';
import ApplicationInfo from '../../../../organisms/applications/ApplicationInfo';

type MyApplicationBoxesProps = {
  applicant?: TApplicant;
  mutateApplicant: () => void;
};

function MyApplicationBoxes({
  applicant,
  mutateApplicant,
}: MyApplicationBoxesProps) {
  if (!applicant)
    return (
      <div className="h-20 w-full rounded-2xl border bg-white p-4 font-semibold">
        No hire.
      </div>
    );

  return (
    <div className="w-full pb-4 ">
      <HiredCard
        hasButtons={true}
        userId={applicant?.user?.id}
        name={applicant?.user?.name}
        applicantId={applicant?.id}
        avatar={applicant?.user?.avatar}
        username={applicant?.user?.username ?? ''}
        paymentRate={applicant?.payment_rate ?? undefined}
        paymentType={applicant?.payment_type ?? undefined}
        endHire={() => console.log('ENDHIRE')}
      />
      <ApplicationInfo applicant={applicant} />
    </div>
  );
}

export default MyApplicationBoxes;
