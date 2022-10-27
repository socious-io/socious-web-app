import React, {FC, PropsWithChildren, useCallback, useState} from 'react';
import useSWR, {KeyedMutator} from 'swr';

// Components
import {Avatar, Button} from '@components/common';
import BodyBox from '@components/common/Project/BodyBox/BodyBox';
import ConfirmApplicantActionModal from '@components/common/Project/created/ApplicantsContent/ConfirmApplicantActionModal/ConfirmApplicantActionModal';

// Hooks/services/utils
import {get} from 'utils/request';
import {useToggle, useUser} from '@hooks';
import {approveOffer, withdrawApplication} from '@api/applicants/actions';

// Types
import {TApplicant} from '@models/applicant';
import {Project} from '@models/project';
import Link from 'next/link';
import {toast} from 'react-toastify';
import ApplicationInfo from '@components/common/Project/created/Shared/ApplicationInfo';
import {ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/24/outline';
import EndAssignmentModal from '../Modals/EndAssignmentModal/EndAssignmentModal';
import StopAssignmentModal from '../Modals/StopAssignmentModal/StopAssignmentModal';
import {completeAssignment, stopAssignment} from '@api/employed/actions';
type MyApplicationProps = {
  applicant: TApplicant;
  mutateApplication: KeyedMutator<TApplicant>;
};

// Wrapper for Head.
export const WrapperWithHead: FC<PropsWithChildren<{title: string}>> = ({
  title,
  children,
}) => {
  const {state: show, handlers: showHandlers} = useToggle(true);
  return (
    <div className="md:border-grayLinedBased w-full divide-y divide-grayLineBased border bg-white md:rounded-2xl">
      <h1 className="flex justify-between py-5 px-4 text-base font-semibold">
        {title}
        <div className="md:hidden" onClick={showHandlers.toggle}>
          {show ? (
            <ChevronUpIcon className="w-5" />
          ) : (
            <ChevronDownIcon className="w-5" />
          )}
        </div>
      </h1>
      {show && children}
    </div>
  );
};

// Main Component
const MyApplication = ({applicant, mutateApplication}: MyApplicationProps) => {
  const {offer_message, payment_type, payment_rate, status} = applicant;
  const {state: confirmApprove, handlers: approveOfferHandlers} = useToggle();
  const {state: confirmReject, handlers: rejectOfferHandlers} = useToggle();
  const [endingState, setAssignmentEndState] = useState<
    'OPEN' | 'COMPLETED' | 'STOP' | null
  >(null);

  // Fetch Project
  const {data: project, error: projectError} = useSWR<Project>(
    applicant.project_id ? `/projects/${applicant.project_id}` : null,
    get,
  );

  // my(user) application.
  const {user} = useUser();

  const onApprove = useCallback(async () => {
    try {
      const updatedApplicant = await approveOffer(applicant.id);
      mutateApplication(updatedApplicant, {revalidate: false});
      approveOfferHandlers.off();
      toast.success('Offer was approved just now.');
    } catch (err) {
      console.error(err);
      toast.error('Offer approval failed.');
    }
  }, [applicant, approveOfferHandlers, mutateApplication]);

  const onWithdraw = useCallback(async () => {
    try {
      await withdrawApplication(applicant.id);
      mutateApplication();
      rejectOfferHandlers.off();
      toast.info('Application was withdrawn just now.');
    } catch (err) {
      console.error(err);
      toast.error('Application withdrawal failed.');
    }
  }, [applicant, mutateApplication, rejectOfferHandlers]);

  // Change with "EMPLOYED_ID"
  const onAssignmentCompleted = useCallback(async () => {
    try {
      await completeAssignment(applicant.id);
      setAssignmentEndState(null);
      mutateApplication();
      // toast.success('Assignment completed information send to organization.');
    } catch (err) {
      console.log('COMPLETED :---: ', err);
      toast.error('Assigment completion failed. Please try again later.');
    }
  }, [applicant.id, mutateApplication]);

  const onAssignmentStopped = useCallback(async () => {
    try {
      await stopAssignment(applicant.id);
      setAssignmentEndState(null);
      mutateApplication();
      // toast.success('Assignment stopped information send to organization.');
    } catch (err) {
      console.log('STOPPED :---: ', err);
      toast.error('Assignment stop failed. Please try again later.');
    }
  }, [applicant.id, mutateApplication]);
  return (
    <div className="max-w-screen -mx-6 rounded-2xl md:mx-0 md:w-full md:space-y-4 md:bg-offWhite md:pb-4">
      {/* TODO:// UNCOMMENT based on logic and usability */}
      {/* {status !== 'PENDING' && status !== 'REJECTED' && ( */}
      {/* {['PENDING', 'REJECTED'].includes(status)} && */}
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
          applicantInfo={user}
          className="rounded-t-none border-0"
        />
      </WrapperWithHead>
      {/* END ASSIGMENT BUTTON */}
      <div className="mt-12 w-full border bg-white p-4 pb-12 md:mt-0 md:rounded-2xl md:pb-4">
        <Button
          className="flex w-full justify-center"
          variant="outline"
          onClick={() => setAssignmentEndState('OPEN')}
        >
          End assignment
        </Button>
      </div>

      {/* ----- Modals ---- */}
      {/* APPLY & REJECT */}
      <ConfirmApplicantActionModal
        state={confirmApprove}
        title="Send offer"
        description={`If you accepts this offer, they will be working on/as ${project?.title} from ${project?.identity_meta?.name}.`}
        continueText="Approve offer"
        nextStep={onApprove}
        cancel={() => approveOfferHandlers.off()}
      />
      <ConfirmApplicantActionModal
        state={confirmReject}
        title="Reject applicant"
        description={`Are you sure you want to withdraw the application for ${project?.title}? from ${project?.identity_meta?.name}`}
        continueText="Withdraw"
        nextStep={onWithdraw}
        cancel={() => rejectOfferHandlers.off()}
      />
      {/* SUBMIT for REVIEW */}
      <EndAssignmentModal
        state={endingState === 'OPEN'}
        setAction={setAssignmentEndState}
      />
      <ConfirmApplicantActionModal
        state={endingState === 'COMPLETED'}
        title="Mark as completed"
        description={`Once the ${project?.identity_meta?.name} confirms the assignement completion, you will receive your payment.`}
        continueText="Confirm"
        nextStep={
          // onAssignmentCompleted
          () =>
            console.log(
              '--------------------------COMPLETED----------------------------------',
            )
        }
        cancel={() => setAssignmentEndState(null)}
      />
      <StopAssignmentModal
        projectName={project?.title ?? ''}
        state={endingState === 'STOP'}
        cancel={() => setAssignmentEndState(null)}
        nextStep={
          // onAssignmentStopped
          () =>
            console.log(
              '--------------------------STOPPED----------------------------------',
            )
        }
      />
    </div>
  );
};

export default MyApplication;
