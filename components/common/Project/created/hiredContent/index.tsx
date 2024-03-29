import HiredCard from '../../component/HiredCard';
import ApplicationInfo from '../../../../organisms/applications/ApplicationInfo';
import {IOffer} from '@models/offer';
import {IMission} from '@models/mission';
import {useApplication} from '@hooks';
import {TUserByUsername} from '@models/profile';

type HiredInfoProps = {
  offer: IOffer;
  mission: IMission;
  user: TUserByUsername;
};

function HiredInfo({offer, user, mission}: HiredInfoProps) {
  if (!offer)
    return (
      <div className="h-20 w-full rounded-2xl border bg-white p-4 font-semibold">
        No hire.
      </div>
    );

  return (
    <div className="w-full space-y-4 pb-4 ">
      <HiredCard
        hasButtons={true}
        userId={user?.id}
        name={user.first_name + ` ${user.last_name}`}
        avatar={user.avatar?.url}
        username={user?.username ?? ''}
        paymentRate={offer.offer_rate ?? undefined}
        paymentType={offer.payment_type ?? undefined}
        mission={mission}
      />
      {offer.applicant_id && (
        <ApplicantFromId applicantId={offer.applicant_id} />
      )}
    </div>
  );
}

export default HiredInfo;

const ApplicantFromId = ({applicantId}: {applicantId: string}) => {
  const {data: applicant, isLoading} = useApplication(applicantId);

  const applicationStatus = isLoading ? (
    <p>Loading....</p>
  ) : applicant ? (
    <ApplicationInfo applicant={applicant} />
  ) : (
    <p>Error</p>
  );

  return applicationStatus;
};
