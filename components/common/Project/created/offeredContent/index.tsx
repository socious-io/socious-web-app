import OfferedCard from '../../component/OfferedCard';
import ApplicationInfo from '../../../../organisms/applications/ApplicationInfo';
import {IOffer} from '@models/offer';
import {useApplication} from '@hooks';
import {TUserByUsername} from '@models/profile';

type OfferInfoProps = {
  offer: IOffer;
};

function OfferInfo({offer}: OfferInfoProps) {
  if (!offer)
    return (
      <div className="h-20 w-full rounded-2xl border bg-white p-4 font-semibold">
        No hire.
      </div>
    );

  return (
    <div className="w-full space-y-4 pb-4 ">
      <OfferedCard offer={offer} />
      {offer.applicant_id && (
        <ApplicantFromId applicantId={offer.applicant_id} />
      )}
    </div>
  );
}

export default OfferInfo;

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
