import {Avatar} from '@components/common';
import {Button} from '@components/common';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import {twMerge} from 'tailwind-merge';

const endhireSrc = require('../../../../asset/icons/endhire.svg');
const messageSrc = require('../../../../asset/icons/message.svg');
// Types
type ApplicantHireCardProps = {
  selected?: boolean;
  hasButtons: boolean;
  userId: string;
  name?: string;
  username?: string;
  paymentType?: string;
  paymentRate?: string;
  applicantId?: string;
  avatar?: string;
  endHire?: () => void;
};

function HiredCard({
  selected = false,
  hasButtons,
  name,
  userId,
  username,
  paymentType,
  paymentRate,
  applicantId,
  avatar,
  endHire,
}: ApplicantHireCardProps) {
  return (
    <div
      className={twMerge(
        'space-y-6 p-4',
        hasButtons && 'rounded-2xl  border border-grayLineBased bg-white',
        selected && 'bg-offWhite',
      )}
    >
      <div className="flex flex-row space-x-2">
        <Avatar size={hasButtons ? 'xl' : 'l'} src={avatar} type="users" />
        <div className="flex flex-col">
          <p className="text-2xl font-semibold text-black">{name}</p>
          <Link href={`/app/user/${username}`}>
            <p className="cursor-pointer text-primary">View profile</p>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 items-center rounded-2xl bg-offWhite p-2">
        <div className="flex flex-col">
          <p className="font-normal text-primary">Payment type</p>
          <p className="text-graySubtitle">{paymentType ?? 'Not specified'}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-normal text-primary ">Payment rate</p>
          <p className="text-graySubtitle">{paymentRate ?? 'Not specified'}</p>
        </div>
      </div>
      {hasButtons && (
        <div className="mt-4 flex justify-between space-x-2">
          <Button
            className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
            type="submit"
            size="lg"
            variant="outline"
            value="Submit"
            onClick={() => endHire && endHire()}
          >
            <div className="relative h-5 w-5 ">
              <a>
                <Image
                  src={endhireSrc}
                  className="fill-warning"
                  alt="End Hire"
                  layout="fill" // required
                />
              </a>
            </div>
            End hire
          </Button>
          <Button
            className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
            type="submit"
            size="lg"
            variant="outline"
            value="Submit"
            onClick={() => Router.push(`/app/chat/create/${userId}`)}
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
      )}
    </div>
  );
}

export default HiredCard;
