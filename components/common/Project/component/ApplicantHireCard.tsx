import {Avatar} from '@components/common';
import {Button} from '@components/common';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';

const endhireSrc = require('../../../../asset/icons/endhire.svg');
const messageSrc = require('../../../../asset/icons/message.svg');
const rejectSrc = require('../../../../asset/icons/reject.svg');

// Types
type ApplicantHireCardProps = {
  name: string;
  username?: string;
  bio: string;
  status: string;
  userId: string;
  applicantId: string;
  avatar?: string;
  showOfferForm: () => void;
};
function ApplicantHiredCard({
  name,
  username,
  bio,
  status,
  userId,
  applicantId,
  avatar,
  showOfferForm,
}: ApplicantHireCardProps) {
  return (
    <div className="my-4 space-y-6 rounded-2xl border border-grayLineBased bg-white p-4">
      <div className="flex flex-row items-center justify-between ">
        <div className="flex flex-row space-x-2">
          <Avatar size="xl" src={avatar} type={'users'} />
          <div className="flex flex-col">
            <p className="text-2xl font-semibold text-black">{name}</p>
            <Link href={`/app/user/${username}`}>
              <p className="cursor-pointer text-primary">View profile</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 items-center rounded-2xl bg-offWhite p-4">
        <p className="text-black">
          {bio?.length > 200 ? `${bio?.slice(0, 50)}...` + 'See more' : bio}
        </p>
      </div>

      <div className="mt-4 flex justify-between space-x-2">
        <Button
          className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
          type="submit"
          size="lg"
          variant="outline"
          value="Submit"
          onClick={() => status === 'PENDING' && showOfferForm()}
        >
          <div className="relative mx-2 h-5 w-5 ">
            <Image
              src={endhireSrc}
              className="fill-warning"
              alt="dislike"
              layout="fill" // required
            />
          </div>
          {status === 'PENDING' ? 'Hire' : 'End hire'}
        </Button>
        {status === 'PENDING' && (
          <Button
            className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
            type="submit"
            size="lg"
            variant="outline"
            value="Submit"
          >
            <div className="relative mx-2 h-5 w-5 ">
              <a>
                <Image
                  src={rejectSrc}
                  className="fill-warning"
                  alt="dislike"
                  layout="fill" // required
                />
              </a>
            </div>
            reject
          </Button>
        )}
        <Button
          className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
          type="submit"
          size="lg"
          variant="outline"
          value="Submit"
          onClick={() => Router.push(`/app/chat/create/${userId}`)}
        >
          <div className="relative mx-2 h-5 w-5 ">
            <a>
              <Image
                src={messageSrc}
                className="fill-warning"
                alt="dislike"
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

export default ApplicantHiredCard;
