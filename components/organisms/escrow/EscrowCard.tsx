import {Avatar} from '@components/common';
import {
  BriefcaseIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import {TOffer} from '@models/offer';

type EscrowCardType = {
  offer: TOffer;
};

const EscrowCard = ({offer}: EscrowCardType) => {
  return (
    <div className="rounded-2xl border  border-b-grayLineBased bg-white p-4">
      <div className="flex flex-row items-center justify-between ">
        <div className="flex flex-row items-center space-x-3">
          <Avatar size="l" src={''} />
          <div>
            <p className="text-black">{'Name'}</p>
            <p className="text-graySubtitle">{'Text'}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="my-4 text-sm">{'Mar 1 - Present'}</p>
        {offer.status === 'APPROVED' && (
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
            Paid hourly
          </div>
          <div className="flex px-2">
            <CurrencyDollarIcon className="mr-2 w-5 text-primary" />
            $50 / hr
          </div>
          <div className="flex pl-2">
            <ClockIcon className="mr-2 w-5 text-primary" />
            10 hrs
          </div>
        </div>
        <div className="hidden justify-between pt-3 sm:flex">
          <span>Weekly total</span>
          <span>$500</span>
        </div>
      </div>
    </div>
  );
};

export default EscrowCard;
