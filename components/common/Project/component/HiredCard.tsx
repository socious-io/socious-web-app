import {Avatar} from '@components/common';
import {Button} from '@components/common';
import Image from 'next/image';

const endhireSrc = require('../../../../asset/icons/endhire.svg');
const messageSrc = require('../../../../asset/icons/message.svg');

interface Props {
  hasButtons: boolean;
}
function HiredCard({hasButtons}: Props) {
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
      <div className="grid grid-cols-2 items-center rounded-2xl bg-offWhite p-2">
        <div className="flex flex-col">
          <p className="font-normal text-primary">Payment type</p>
          <p className="text-graySubtitle">paid</p>
        </div>
        <div className="flex flex-col">
          <p className="font-normal text-primary ">Payment rate</p>
          <p className="text-graySubtitle">$35 / hour</p>
        </div>
      </div>
      {hasButtons && (
        <div className="mt-4 flex justify-between">
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
      )}
    </div>
  );
}

export default HiredCard;
