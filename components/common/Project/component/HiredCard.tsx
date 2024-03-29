import {Avatar} from '@components/common';
import {Button} from '@components/common';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import {twMerge} from 'tailwind-merge';
import {IOffer} from '@models/offer';
import {IMission} from '@models/mission';
import dayjs from 'dayjs';
import {stopAssignment, confirmWork} from '@api/mission/actions';

const rejectSrc = require('../../../../asset/icons/reject.svg');
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
  avatar?: string;
  mission: IMission;
};

function HiredCard({
  selected = false,
  hasButtons,
  name,
  userId,
  username,
  paymentType,
  paymentRate,
  avatar,
  mission,
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
        <Avatar size={'l'} src={avatar} type="users" />
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
      <div className="grid grid-cols-2 items-center rounded-2xl bg-offWhite p-2">
        <div className="flex flex-col">
          <p className="font-normal text-primary ">Hired date</p>
          <p className="text-graySubtitle">
            {dayjs(mission.created_at)?.format('MMM D')}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="font-normal text-primary ">Status</p>
          <p className="text-graySubtitle">{mission.status}</p>
        </div>
      </div>

      <div className="mt-4 flex justify-around space-x-2">
        {mission.status === 'ACTIVE' && (
          <Button
            className="mt-4 flex w-full max-w-xs items-center justify-center align-middle "
            type="submit"
            size="lg"
            variant="outline"
            value="Submit"
            onClick={async () => {
              await stopAssignment(mission.id);
              Router.push(`/app/projects/created/${mission.project_id}/hired`);
            }}
          >
            <div className="relative h-5 w-5 ">
              <a>
                <Image
                  src={rejectSrc}
                  className="fill-warning"
                  alt="Stop assignment"
                  layout="fill" // required
                />
              </a>
            </div>
            Stop Assignment
          </Button>
        )}
        {mission.status === 'COMPLETE' && (
          <Button
            className="mt-4 flex w-full max-w-xs items-center justify-center align-middle "
            type="submit"
            size="lg"
            variant="outline"
            value="Submit"
            onClick={async () => {
              await confirmWork(mission.id);
              Router.push(`/app/projects/created/${mission.project_id}/hired`);
            }}
          >
            <div className="relative h-5 w-5 ">
              <a>
                <Image
                  src={endhireSrc}
                  className="fill-warning"
                  alt="End "
                  layout="fill" // required
                />
              </a>
            </div>
            Confirm Work
          </Button>
        )}
        <Button
          className="mt-4 flex w-full max-w-xs items-center justify-center align-middle "
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
    </div>
  );
}

export default HiredCard;
