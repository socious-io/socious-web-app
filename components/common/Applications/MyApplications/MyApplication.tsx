import React, {FC, PropsWithChildren, useCallback} from 'react';
import useSWR, {KeyedMutator} from 'swr';

// Components
import {Avatar, Button} from '@components/common';
import BodyBox from '@components/common/Project/BodyBox/BodyBox';
import ConfirmApplicantActionModal from '@components/common/Project/created/ApplicantsContent/ConfirmApplicantActionModal/ConfirmApplicantActionModal';

// Hooks/services/utils
import {get} from 'utils/request';
import {useFormattedLocation} from 'services/formatLocation';
import {useToggle, useUser} from '@hooks';
import {approveOffer, withdrawApplication} from '@api/applicants/actions';

// Types
import {TApplicant} from '@models/applicant';
import {Project} from '@models/project';
import Link from 'next/link';
import {toast} from 'react-toastify';
import ApplicationInfo from '@components/organisms/applications/ApplicationInfo';
type MyApplicationProps = {
  applicant: TApplicant;
  mutateApplication: KeyedMutator<TApplicant>;
};

// Wrapper for Head.
const WrapperWithHead: FC<PropsWithChildren<{title: string}>> = ({
  title,
  children,
}) => {
  return (
    <div className="sm:border-grayLinedBased w-full divide-y divide-grayLineBased border bg-white sm:rounded-2xl">
      <h1 className="py-5 px-4 text-base font-semibold">{title}</h1>
      {children}
    </div>
  );
};

// Main Component
const MyApplication = ({applicant, mutateApplication}: MyApplicationProps) => {
  const {offer_message, payment_type, payment_rate, status} = applicant;

  const {state: confirmApprove, handlers: approveOfferHandlers} = useToggle();
  const {state: confirmReject, handlers: rejectOfferHandlers} = useToggle();

  // Fetch Project
  const {data: project, error: projectError} = useSWR<Project>(
    applicant.project_id ? `/projects/${applicant.project_id}` : null,
    get,
  );

  const onApprove = useCallback(async () => {
    try {
      const updatedApplicant = await approveOffer(applicant.id);
      mutateApplication(updatedApplicant, {revalidate: false});
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
  }, [applicant, approveOfferHandlers, mutateApplication]);

  const onWithdraw = useCallback(async () => {
    try {
      await withdrawApplication(applicant.id);
      mutateApplication();
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
      console.error(err);
    }
  }, [applicant, mutateApplication, rejectOfferHandlers]);

  return (
    <div className="w-full space-y-4 rounded-2xl pb-4">
      {/* {status !== 'PENDING' && status !== 'REJECTED' && ( */}
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
                {payment_rate ?? 'Not specified'}
              </p>
            </div>
          </div>
        </div>
        {/* If OFFERED */}
        {status === 'OFFERED' ? (
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
        ) : ['APPROVED', 'HIRED'].includes(status) ? (
          <div className="m-4 rounded-2xl !border bg-offWhite p-4">
            You have already accepted the offer from{' '}
            {project?.identity_meta?.name} for {project?.title}.
          </div>
        ) : (
          status === 'PENDING' && (
            <div className="m-4 rounded-2xl !border bg-offWhite p-4">
              You have applied for {project?.title} from{' '}
              {project?.identity_meta?.name}.
            </div>
          )
        )}
      </WrapperWithHead>
      {/* )} */}
      {project && (
        <WrapperWithHead title="Project Info">
          <div className="space-y-3 p-4">
            <Link href={`/app/projects/${project.id}`}>
              <h1 className="text-base font-semibold">{project.title}</h1>
            </Link>
            <Link href={`/app/organization/${project.identity_meta.shortname}`}>
              <div className="flex cursor-pointer items-center space-x-2">
                <Avatar
                  size="l"
                  src={project.identity_meta.image}
                  type="organizations"
                />
                <p className="text-black">{project.identity_meta.name}</p>
              </div>
            </Link>
            <BodyBox
              description={project.description}
              className="p-0"
              minCount={100}
            />
          </div>
        </WrapperWithHead>
      )}
      {/* TODO: Refactor with ApplicationInfo component once merged */}
      <WrapperWithHead title="My application">
        <ApplicationInfo
          applicant={applicant}
          className="rounded-t-none border-0"
        />
      </WrapperWithHead>
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

export default MyApplication;
