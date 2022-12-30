import {Avatar} from '@components/common';
import {Button} from '@components/common';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import {IOffer} from '@models/offer';
import {twMerge} from 'tailwind-merge';
import {hire, cancel} from '@api/offers/actions';
import dayjs from 'dayjs';

const endhireSrc = require('../../../../asset/icons/endhire.svg');
const rejectSrc = require('../../../../asset/icons/reject.svg');
const messageSrc = require('../../../../asset/icons/message.svg');
// Types
type OfferCardProps = {
  offer: IOffer;
};

function OfferedCard({offer}: OfferCardProps) {
  return (
    <div className="space-y-6 rounded-2xl border  border-grayLineBased bg-white bg-offWhite p-4">
      <div className="flex flex-row space-x-2">
        <Avatar size="l" src={offer.recipient.meta?.avatar} type="users" />
        <div className="flex flex-col">
          <p className="text-2xl font-semibold text-black">
            {offer.recipient.meta?.name}
          </p>
          <Link href={`/app/user/${offer.recipient.meta?.username}`}>
            <p className="cursor-pointer text-primary">View profile</p>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 items-center rounded-2xl bg-offWhite p-2">
        <div className="flex flex-col">
          <p className="font-normal text-primary">Payment type</p>
          <p className="text-graySubtitle">
            {offer.project.payment_type ?? 'Not specified'}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="font-normal text-primary ">Payment rate</p>
          <p className="text-graySubtitle">
            {offer.offer_rate ?? 'Not specified'}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 items-center rounded-2xl bg-offWhite p-2">
        <div className="flex flex-col">
          <p className="font-normal text-primary">Status</p>
          <p className="text-graySubtitle">{offer.status}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-normal text-primary ">Total Hours</p>
          <p className="text-graySubtitle">{offer.total_hours} H</p>
        </div>
        <div className="flex flex-col">
          <p className="font-normal text-primary ">Offered Date</p>
          <p className="text-graySubtitle">
            {dayjs(offer?.created_at)?.format('MMM D')}
          </p>
        </div>
      </div>
      <div className="mt-4 flex justify-around space-x-2">
        {offer.status === 'APPROVED' && (
          <Button
            className="mt-4 flex w-full max-w-xs items-center justify-center align-middle "
            type="submit"
            size="lg"
            variant="outline"
            value="Submit"
            onClick={async () => {
              await hire(offer.id);
              return Router.push(
                `/app/projects/created/${offer.project_id}/hired`,
              );
            }}
          >
            <div className="relative h-5 w-5 ">
              <a>
                <Image
                  src={endhireSrc}
                  className="fill-warning"
                  alt="Hire"
                  layout="fill" // required
                />
              </a>
            </div>
            Hire
          </Button>
        )}
        {offer.status === 'APPROVED' && (
          <Button
            className="mt-4 flex w-full max-w-xs items-center justify-center align-middle "
            type="submit"
            size="lg"
            variant="outline"
            value="Submit"
            onClick={async () => {
              await cancel(offer.id);
              return Router.push(
                `/app/projects/created/${offer.project_id}/offered`,
              );
            }}
          >
            <div className="relative h-5 w-5 ">
              <a>
                <Image
                  src={rejectSrc}
                  className="fill-warning"
                  alt="Reject"
                  layout="fill" // required
                />
              </a>
            </div>
            Reject
          </Button>
        )}
        <Button
          className="mt-4 flex w-full max-w-xs items-center justify-center align-middle "
          type="submit"
          size="lg"
          variant="outline"
          value="Submit"
          onClick={() => Router.push(`/app/chat/create/${offer.recipient_id}`)}
        >
          <div className="relative  h-5 w-5 ">
            <a>
              <Image
                src={messageSrc}
                className="fill-warning"
                alt="Message"
                layout="fill" // required
              />
            </a>
          </div>
          Message
        </Button>
      </div>
    </div>
  );
}

export default OfferedCard;
