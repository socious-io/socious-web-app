import {useCallback} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import useSWR from 'swr';
import ApplicantHiredCard from '../../component/ApplicantHireCard';
import {toast} from 'react-toastify';

// Components
import ConfirmApplicantActionModal from './ConfirmApplicantActionModal/ConfirmApplicantActionModal';
import HireApplicantModal from './HireApplicantModal/HireApplicantModal';

// Services/Utils
import {offerApplicant, rejectApplicant} from '@api/applicants/actions';
import {useToggle} from '@hooks';
import {get} from 'utils/request';

// Schema
import {schemaOfferApplicant} from '@api/applicants/validation';

// Types
import {TApplicant, TOfferApplicant} from '@models/applicant';
import ApplicationInfo from '../Shared/ApplicationInfo';
import {TUserByUsername} from '@models/profile';

// Type
type MyApplicationBoxesProps = {
  applicant: TApplicant;
  mutateApplicant: () => void;
};

function MyApplicationBoxes({
  mutateApplicant,
  applicant,
}: MyApplicationBoxesProps) {
  const {state: showOfferForm, handlers: showOfferFormHandlers} = useToggle();
  const {state: confirmOffer, handlers: confirmOfferHandlers} = useToggle();
  const {state: confirmReject, handlers: confirmRejectHandlers} = useToggle();

  const offerApplicantFormData = useForm({
    resolver: joiResolver(schemaOfferApplicant),
  });
  const {data: applicantInfo, error: applicantInfoError} =
    useSWR<TUserByUsername>(
      applicant?.user?.username
        ? `/user/by-username/${applicant.user.username}/profile`
        : null,
      get,
    );

  const onOfferFormSubmitted = useCallback(
    (data: TOfferApplicant) => {
      showOfferFormHandlers.off();
      confirmOfferHandlers.on();
    },
    [confirmOfferHandlers, showOfferFormHandlers],
  );
  const offerConfirm = useCallback(async () => {
    const due_date = offerApplicantFormData.getValues('due_date');
    const offer_message = offerApplicantFormData.getValues('offer_message');
    const hourly_rate = offerApplicantFormData.getValues('hourly_rate');
    const weekly_limit = offerApplicantFormData.getValues('weekly_limit');
    const total_hours = offerApplicantFormData.getValues('total_hours');
    const weekly_commitment =
      offerApplicantFormData.getValues('weekly_commitment');
    const assignment_total =
      offerApplicantFormData.getValues('assignment_total');

    const offerBody: any = {
      offer_message,
    };
    if (due_date) offerBody.due_date = due_date;
    if (hourly_rate) offerBody.offer_rate = hourly_rate;
    if (weekly_limit) offerBody.weekly_limit = weekly_limit;
    if (total_hours) offerBody.total_hours = total_hours;
    if (weekly_commitment) offerBody.weekly_commitment = weekly_commitment;
    if (assignment_total) offerBody.assignment_total = assignment_total;

    offerApplicant(applicant.id, offerBody)
      .then((response: any) => {
        console.log('OFFER RESPONSE :---: ', response);
        confirmOfferHandlers.off();
        toast.success('Offer was sent just now.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        mutateApplicant();
      })
      .catch((error: any) => console.log('ERROR', error));
  }, [
    applicant,
    confirmOfferHandlers,
    mutateApplicant,
    offerApplicantFormData,
  ]);

  const rejectConfirm = useCallback(() => {
    rejectApplicant(applicant.id)
      .then((response) => {
        console.log('response');
        confirmRejectHandlers.off();
        mutateApplicant();
      })
      .catch((error) => console.log('ERROR: ', error));
  }, [applicant, confirmRejectHandlers, mutateApplicant]);

  return (
    <div className="w-full pb-4 ">
      <div className="w-full pb-4 ">
        <ApplicantHiredCard
          name={applicant?.user?.name}
          userId={applicant?.user_id}
          applicantId={applicant?.id}
          bio={applicantInfo?.bio ?? 'No Bio'}
          avatar={applicant?.user?.avatar}
          username={applicant?.user?.username}
          status={applicant?.status}
          showOfferForm={() => showOfferFormHandlers.on()}
          rejectApplicant={() => confirmRejectHandlers.on()}
        />
      </div>
      {applicantInfo && (
        <ApplicationInfo applicant={applicant} applicantInfo={applicantInfo} />
      )}

      {/* Offer */}
      <FormProvider {...offerApplicantFormData}>
        <HireApplicantModal
          modalState={showOfferForm}
          onSubmit={onOfferFormSubmitted}
          onClose={() => showOfferFormHandlers.off()}
        />
      </FormProvider>
      <ConfirmApplicantActionModal
        state={confirmOffer}
        title="Send offer"
        description={`If ${applicant?.user?.name} accepts this offer, they will be working on your project.`}
        continueText="Send offer"
        nextStep={offerConfirm}
        cancel={() => confirmOfferHandlers.off()}
      />
      {/* Reject */}
      <ConfirmApplicantActionModal
        state={confirmReject}
        title="Reject applicant"
        description={`Are you sure you want to reject ${applicant?.user?.name} for this project?`}
        continueText="Reject"
        nextStep={rejectConfirm}
        cancel={() => confirmRejectHandlers.off()}
      />
    </div>
  );
}

export default MyApplicationBoxes;
