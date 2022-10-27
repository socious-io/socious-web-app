import {
  ClipboardIcon,
  InformationCircleIcon,
  NoSymbolIcon,
} from '@heroicons/react/24/outline';
import {TApplicantStatus} from '@models/applicant';
import React from 'react';
import {twMerge} from 'tailwind-merge';

const IconByStatus = (status: string) => {
  switch (status) {
    case 'COMPLETED':
      return <ClipboardIcon className="w-5" />;
    case 'WITHDRAWN':
    case 'STOPPED':
      return <NoSymbolIcon className="w-5" />;
    default:
      return <InformationCircleIcon className="w-5" />;
  }
};

const ApplicationStatusBanner = ({
  status,
  title,
  description,
}: {
  status: string | TApplicantStatus;
  title: string;
  description: string;
}) => {
  return (
    <div
      className={twMerge(
        'flex w-full items-start bg-white px-4 py-3 md:rounded-2xl',
        status === 'COMPLETED' && 'bg-warning',
        ['WITHDRAWN', 'STOPPED'].includes(status) && 'bg-error',
      )}
    >
      <div className="p-3">{IconByStatus(status)}</div>
      <div className="grow">
        {title && <h1 className="my-0 py-2 text-sm font-semibold">{title}</h1>}
        {description && <p className="text-sm">{description}</p>}
      </div>
    </div>
  );
};

export default ApplicationStatusBanner;
