import {Avatar} from '@components/common';
import {
  BriefcaseIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import {IOffer} from '@models/offer';
import {TUserByUsername} from '@models/profile';
import {Project} from '@models/project';
import {getText} from '@socious/data';
import {useCallback, useMemo} from 'react';

type EscrowCardType = {
  offer?: IOffer;
  project: Project;
  user: TUserByUsername;
};

const EscrowCard = ({offer, project, user}: EscrowCardType) => {
  const options = {style: 'currency', currency: project.payment_currency};

  const currency = (price: number) =>
    new Intl.NumberFormat('en-US', options).format(price);

  return (
    <div className="rounded-2xl border  border-b-grayLineBased bg-white p-4">
      <div className="flex flex-row items-center justify-between ">
        <div className="flex flex-row items-center space-x-3">
          <Avatar size="l" src={user?.avatar?.url} />
          <div>
            <p className="text-black">
              {user?.first_name + ` ${user?.last_name}`}
            </p>
            <p className="text-graySubtitle">{'Text'}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="my-4 text-sm">{'Mar 1 - Present'}</p>
        {offer &&
          offer.status === 'APPROVED' &&
          project.project_type === 'PAID' && (
            <p className="inline-flex gap-2 rounded-2xl bg-error py-1 px-2 text-white">
              <ExclamationCircleIcon className="w-5" />
              Payment required
            </p>
          )}
      </div>
      <div className="w-full items-center divide-y rounded-2xl bg-offWhite p-3">
        <div className="mb-3 flex divide-x text-graySubtitle">
          <div className="flex pr-2">
            <BriefcaseIcon className="mr-2 w-5 text-primary" />
            {project.payment_type &&
              getText('en', `PAYMENT.${project.payment_type}`)}{' '}
            {project.payment_scheme &&
              getText('en', `PAYMENT.${project.payment_scheme}`)}{' '}
          </div>
          <div className="flex px-2">
            <CurrencyDollarIcon className="mr-2 w-5 text-primary" />
            {project.payment_scheme === 'FIXED'
              ? currency(offer?.offer_rate ?? 0)
              : project.payment_scheme === 'HOURLY'
              ? currency(offer?.offer_rate ?? 0) + ' / hr'
              : currency(offer?.offer_rate ?? 0) + ' /hr'}
          </div>
          <div className="flex pl-2">
            <ClockIcon className="mr-2 w-5 text-primary" />
            {offer?.total_hours && offer.total_hours + ' hrs'}
          </div>
        </div>
        <div className="hidden justify-between pt-3 sm:flex">
          <span>Weekly total</span>
          <span>{currency(500)}</span>
        </div>
      </div>
    </div>
  );
};

export default EscrowCard;
