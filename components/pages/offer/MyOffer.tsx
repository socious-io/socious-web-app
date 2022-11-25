import React, {useCallback} from 'react';
import useSWR, {KeyedMutator} from 'swr';
import {toast} from 'react-toastify';

// Components
import {Button} from '@components/common';
import ConfirmApplicantActionModal from '@components/common/Project/created/ApplicantsContent/ConfirmApplicantActionModal/ConfirmApplicantActionModal';
import ApplicationInfo from '@components/organisms/applications/ApplicationInfo';

// Hooks/services/utils
import {get} from 'utils/request';
import {useApplication, useToggle} from '@hooks';
import {approveOffer, withdrawApplication} from '@api/applicants/actions';

// Types
import {Project} from '@models/project';
import {IOffer} from '@models/offer';
import {GlobalResponseType} from '@models/organization';
import {WrapperWithHead} from '../application/MyApplications/MyApplication';
import ProjectInfoWithWrapper from '@components/organisms/applications/ProjectInfoWithWrapper';

type MyOfferProps = {
  offer: IOffer;
  mutateOffer: KeyedMutator<IOffer>;
};
const MyOffer = ({offer, mutateOffer}: MyOfferProps) => {
  const {offer_message, payment_type, payment_scheme, status} = offer;
  const {state: confirmApprove, handlers: approveOfferHandlers} = useToggle();
  const {state: confirmReject, handlers: rejectOfferHandlers} = useToggle();

  // Fetch Project
  const {data: project, error: projectError} = useSWR<Project>(
    offer.project_id ? `/projects/${offer.project_id}` : null,
    get,
  );

  const onApprove = useCallback(async () => {
    if (!offer) return;
    try {
      await approveOffer(offer.id);
      mutateOffer();
      approveOfferHandlers.off();
      toast.success('Offer was approved just now.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } catch (err) {
      console.error(err);
    }
  }, [approveOfferHandlers, mutateOffer, offer]);

  const onWithdraw = useCallback(async () => {
    if (!offer) return;
    try {
      await withdrawApplication(offer.id);
      mutateOffer();
      rejectOfferHandlers.off();
      toast.info('Application was withdrawn just now.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } catch (err) {
      console.log('ERROR :---: ', err);
      console.error(err);
    }
  }, [mutateOffer, offer, rejectOfferHandlers]);

  return (
    <div className="w-full space-y-4 rounded-2xl pb-4">
      <WrapperWithHead title="Offer">
        <div className="space-y-4 p-4">
          <div className="text-sm">
            {offer_message ? offer_message : 'No Message'}
          </div>
          <div className="grid grid-cols-2 items-center">
            <div className="flex flex-col">
              <p className="font-normal text-primary">Payment type</p>
              <p className="text-graySubtitle">
                {payment_type ?? 'Not specified'}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-normal text-primary ">Payment rate</p>
              <p className="text-graySubtitle">
                {payment_scheme ?? 'Not specified'}
              </p>
            </div>
          </div>
        </div>
        {status === 'PENDING' ? (
          <div className="grid grid-cols-2 items-center space-x-2 p-4">
            <Button
              className="flex justify-center"
              type="submit"
              size="lg"
              value="Submit"
              onClick={approveOfferHandlers.on}
            >
              Accept Offer
            </Button>
            <Button
              className="flex justify-center"
              type="submit"
              size="lg"
              variant="outline"
              value="Submit"
              onClick={rejectOfferHandlers.on}
            >
              Withdraw
            </Button>
          </div>
        ) : status === 'APPROVED' ? (
          <div className="m-4 rounded-2xl !border bg-offWhite p-4">
            You have already <b>approved</b> the offer from{' '}
            {project?.identity_meta?.name} for {project?.title}.
          </div>
        ) : status === 'HIRED' ? (
          <div className="m-4 rounded-2xl !border bg-offWhite p-4">
            You have already <b>hired</b> by {project?.identity_meta?.name} for{' '}
            {project?.title}.
          </div>
        ) : (
          status === 'WITHDRAWN' && (
            <div className="m-4 rounded-2xl !border bg-offWhite p-4">
              You have already <b>withdrawn</b> the offer from{' '}
              {project?.identity_meta?.name} for {project?.title}.
            </div>
          )
        )}
      </WrapperWithHead>
      {project && <ProjectInfoWithWrapper project={project} />}
      {offer.applicant_id && (
        <ApplicationInfoWithWrapper applicantId={offer.applicant_id} />
      )}
      {/* Modals */}
      <ConfirmApplicantActionModal
        state={confirmApprove}
        title="Send offer"
        description={`If you accepts this offer, they will be working on/as ${project?.title} from ${project?.identity_meta?.name}.`}
        continueText="Approve offer"
        nextStep={onApprove}
        cancel={() => approveOfferHandlers.off()}
      />
      {/* Reject */}
      <ConfirmApplicantActionModal
        state={confirmReject}
        title="Reject applicant"
        description={`Are you sure you want to withdraw the application for ${project?.title}? from ${project?.identity_meta?.name}`}
        continueText="Withdraw"
        nextStep={onWithdraw}
        cancel={() => rejectOfferHandlers.off()}
      />
    </div>
  );
};
export default MyOffer;

const ApplicationInfoWithWrapper = ({applicantId}: {applicantId: string}) => {
  const {data: applicant, isLoading} = useApplication(applicantId);
  const applicationLoaded: JSX.Element | null = isLoading ? (
    <p>Loading.....</p>
  ) : applicant ? (
    <ApplicationInfo
      applicant={applicant}
      className="rounded-t-none border-0"
    />
  ) : null;

  return (
    <WrapperWithHead title="My application">
      {applicationLoaded}
    </WrapperWithHead>
  );
};
