import {Avatar} from '@components/common';
import {Button} from '@components/common';
import Image from 'next/image';

const endhireSrc = require('../../../../asset/icons/endhire.svg');
const messageSrc = require('../../../../asset/icons/message.svg');

function ApplicantHiredCard() {
  return (
    <div className="my-4 space-y-6 rounded-2xl border border-grayLineBased bg-white p-4">
      <div className="flex flex-row items-center justify-between ">
        <div className="flex flex-row space-x-2">
          <Avatar size="l" />
          <div className="flex flex-col">
            <p className="text-black">Organization</p>
            <p className="text-graySubtitle">Location</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 items-center rounded-2xl bg-offWhite p-4">
        <p className="text-black">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Equat
          faucibus sed facilisi sit id blandiacilisi sit id blandit... See more
        </p>
      </div>

      <div className="mt-4 flex justify-between space-x-2">
        <Button
          className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
          type="submit"
          size="lg"
          variant="outline"
          value="Submit"
        >
          <div className="relative mx-2 h-5 w-5 ">
            <Image
              src={endhireSrc}
              className="fill-warning"
              alt="dislike"
              layout="fill" // required
            />
          </div>
          End hire
        </Button>
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
                src={endhireSrc}
                className="fill-warning"
                alt="dislike"
                layout="fill" // required
              />
            </a>
          </div>
          reject
        </Button>
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
