import React, {FC, PropsWithChildren, useCallback, useState} from 'react';
import useSWR, {KeyedMutator} from 'swr';
import dayjs from 'dayjs';
import {toast} from 'react-toastify';

// Components
import {Button} from '@components/common';
import BodyBox from '@components/common/Project/BodyBox/BodyBox';
import ConfirmApplicantActionModal from '@components/common/Project/created/ApplicantsContent/ConfirmApplicantActionModal/ConfirmApplicantActionModal';
import {PreviewItem} from '@components/common/Project/created/NewProject/ProjectReview/ProjectInfoOverview';
import ApplicationInfo from '@components/common/Project/created/Shared/ApplicationInfo';
import EndAssignmentModal from '../../organisms/hired/Modals/EndAssignmentModal/EndAssignmentModal';
import StopAssignmentModal from '../../organisms/hired/Modals/StopAssignmentModal/StopAssignmentModal';
import ApplicationStatusBanner from '../../common/Applications/ApplicationStatusBanner/ApplicationStatusBanner';
import {WrapperWithHead} from '@components/pages/application/MyApplications/MyApplication';
import ProjectInfoWithWrapper from '@components/organisms/applications/ProjectInfoWithWrapper';

// Hooks/services/utils
import {get} from 'utils/request';
import {useUser} from '@hooks';
import {getText} from '@socious/data';
import {completeAssignment, stopAssignment} from '@api/mission/actions';

// Types
import {IMission} from '@models/mission';
import {IOffer} from '@models/offer';
import {TApplicant} from '@models/applicant';
import {IOrganizationType} from '@models/organization';
import {TProjectIdentityMeta} from '@models/project';

type MyMissionProps = {
  mission: IMission;
  mutateMission: KeyedMutator<IMission>;
};

const MyMission = ({mission, mutateMission}: MyMissionProps) => {
  const {status, project} = mission;
  const [endingState, setAssignmentEndState] = useState<
    'OPEN' | 'COMPLETED' | 'STOP' | null
  >(null);

  const {data: offer} = useSWR<IOffer>(
    mission.offer_id ? `/offers/${mission.offer_id}` : null,
    get,
  );
  const {data: applicant} = useSWR<TApplicant>(
    mission.applicant_id ? `/applicants/${mission.applicant_id}` : null,
    get,
  );
  const {data: org} = useSWR<IOrganizationType>(
    project.identity_id ? `/orgs/${project.identity_id}` : null,
    get,
  );

  const {user} = useUser();
  const onAssignmentCompleted = useCallback(async () => {
    try {
      await completeAssignment(mission.id);
      setAssignmentEndState(null);
      mutateMission();
      toast.success('Assignment completed information send to organization.');
    } catch (err) {
      console.log('ERROR :--: ', err);
      toast.error('Assigment completion failed. Please try again later.');
    }
  }, [mission.id, mutateMission]);

  const onAssignmentStopped = useCallback(async () => {
    try {
      await stopAssignment(mission.id);
      setAssignmentEndState(null);
      mutateMission();
      toast.success('Assignment stopped information send to organization.');
    } catch (err) {
      toast.error('Assignment stop failed. Please try again later.');
    }
  }, [mission.id, mutateMission]);

  return (
    <div className="w-screen rounded-2xl md:mx-0 md:w-full md:space-y-4 md:bg-offWhite md:pb-4">
      {status === 'COMPLETE' && (
        <ApplicationStatusBanner
          status="COMPLETED"
          title={'You marked this assignement completed.'}
          description={`You will get your payment once ${
            org?.name ?? 'organization'
          } confirms on their side.`}
        />
      )}
      <WrapperWithHead isExpandable open title="Assignement details">
        <div className="space-y-4 p-4">
          <div className="text-sm">
            {offer?.offer_message ? offer?.offer_message : 'No Message'}
          </div>
          <div className="grid grid-cols-2 items-center">
            {project?.payment_type && (
              <PreviewItem
                label="Payment type"
                text={getText('en', `PAYMENT.${project.payment_type}`)}
              />
            )}
            {project?.payment_scheme && (
              <PreviewItem
                label="Payment mode"
                text={getText('en', `PAYMENT.${project.payment_scheme}`)}
              />
            )}
            {offer?.total_hours && (
              <PreviewItem label="Total hours" text={offer?.total_hours} />
            )}
            {offer?.assignment_total && (
              <PreviewItem
                label="Assignement total"
                text={offer?.assignment_total}
              />
            )}
            {offer?.due_date && (
              <PreviewItem
                label="Due date"
                text={dayjs(offer?.due_date)?.format('DD/MM/YYYY')}
              />
            )}
          </div>
        </div>
      </WrapperWithHead>

      {project && (
        <ProjectInfoWithWrapper
          project={{
            ...project,
            identity_meta: {
              id: org?.id ?? '',
              name: org?.name ?? '',
              shortname: org?.shortname ?? '',
              image: org?.image?.url ?? '',
            } as TProjectIdentityMeta,
          }}
        />
      )}

      {applicant && (
        <WrapperWithHead isExpandable title="My application">
          <ApplicationInfo
            applicant={applicant}
            applicantInfo={user}
            className="rounded-t-none border-0"
          />
        </WrapperWithHead>
      )}

      {org && (
        <WrapperWithHead isExpandable title="About Organization">
          <BodyBox
            description={org.description ?? 'No description'}
            className="border-0 p-4"
            minCount={100}
          />
        </WrapperWithHead>
      )}
      {/* END ASSIGMENT BUTTON IF COMPLETE */}
      {status === 'ACTIVE' && (
        <div className="mt-12 w-full border bg-white p-4 pb-12 md:mt-0 md:rounded-2xl md:pb-4">
          <Button
            className="flex w-full justify-center"
            variant="outline"
            onClick={() => setAssignmentEndState('OPEN')}
          >
            End assignment
          </Button>
        </div>
      )}

      {/* SUBMIT for REVIEW */}
      <EndAssignmentModal
        state={endingState === 'OPEN'}
        setAction={setAssignmentEndState}
      />
      <ConfirmApplicantActionModal
        state={endingState === 'COMPLETED'}
        title="Mark as completed"
        description={`Once the ${
          org?.name ?? 'organization'
        } confirms the assignement completion, you will receive your payment.`}
        continueText="Confirm"
        nextStep={onAssignmentCompleted}
        cancel={() => setAssignmentEndState(null)}
      />
      <StopAssignmentModal
        projectName={project?.title ?? ''}
        state={endingState === 'STOP'}
        cancel={() => setAssignmentEndState(null)}
        nextStep={onAssignmentStopped}
      />
    </div>
  );
};

export default MyMission;
