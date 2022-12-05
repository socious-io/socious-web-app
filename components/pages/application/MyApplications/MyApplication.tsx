import React, {FC, PropsWithChildren, useCallback} from 'react';
import useSWR, {KeyedMutator} from 'swr';

// Components
import {ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/24/solid';
import {Avatar} from '@components/common';
import BodyBox from '@components/common/Project/BodyBox/BodyBox';

// Hooks/services/utils
import {get} from 'utils/request';
import {useToggle} from '@hooks';

// Types
import {TApplicant} from '@models/applicant';
import {Project} from '@models/project';
import Link from 'next/link';
import ApplicationInfo from '@components/organisms/applications/ApplicationInfo';
import ProjectInfoWithWrapper from '@components/organisms/applications/ProjectInfoWithWrapper';
type MyApplicationProps = {
  applicant: TApplicant;
  mutateApplication: KeyedMutator<TApplicant>;
};

// Wrapper for Head.
export const WrapperWithHead: FC<
  PropsWithChildren<{title: string; isExpandable?: boolean; open?: boolean}>
> = ({title, isExpandable = false, open = false, children}) => {
  const {
    state: show,
    handlers: {toggle},
  } = useToggle(open);
  return (
    <div className="sm:border-grayLinedBased w-full divide-y divide-grayLineBased border bg-white sm:rounded-2xl">
      <h1 className="items-between flex justify-between py-5 px-4 text-base font-semibold">
        <span>{title}</span>
        <div className="sm:hidden">
          {isExpandable && (
            <span onClick={toggle}>
              {show ? (
                <ChevronUpIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              ) : (
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              )}
            </span>
          )}
        </div>
      </h1>
      <div className="sm:hidden">
        {((isExpandable && show) || !isExpandable) && children}
      </div>
      <div className="hidden sm:block">{children}</div>
    </div>
  );
};

// Main Component
const MyApplication = ({applicant, mutateApplication}: MyApplicationProps) => {
  const {offer_message, payment_type, payment_rate, status} = applicant;

  // Fetch Project
  const {data: project} = useSWR<Project>(
    applicant.project_id ? `/projects/${applicant.project_id}` : null,
    get,
  );

  return (
    <div className="-mx-6 w-screen rounded-2xl pb-4 sm:mx-0 sm:w-full sm:space-y-4">
      {/* {status !== 'PENDING' && status !== 'REJECTED' && ( */}
      <WrapperWithHead isExpandable open title="Offer">
        <div className="space-y-4 p-4">
          <div className="text-sm">
            {offer_message ? offer_message : 'No Message'}
          </div>
          <div className="grid grid-cols-2 items-center">
            <div className="flex flex-col">
              <p className="font-normal text-primary">Payment type</p>
              <p className="text-graySubtitle">
                {project?.payment_type ?? 'Not specified'}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-normal text-primary ">Payment rate</p>
              <p className="text-graySubtitle">
                {project?.payment_scheme ?? 'Not specified'}
              </p>
            </div>
          </div>
        </div>
        {/* If OFFERED */}
        {status === 'OFFERED' ? (
          <div className="m-4 rounded-2xl !border bg-offWhite p-4">
            You have received an offer {project?.identity_meta?.name} for{' '}
            {project?.title}.
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
      {project && <ProjectInfoWithWrapper project={project} />}
      {/* TODO: Refactor with ApplicationInfo component once merged */}
      <WrapperWithHead isExpandable title="My application">
        <ApplicationInfo
          applicant={applicant}
          className="rounded-t-none border-0"
        />
      </WrapperWithHead>
    </div>
  );
};

export default MyApplication;
