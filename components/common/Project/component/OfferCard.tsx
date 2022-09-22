import {Avatar} from '@components/common';
import {Button} from '@components/common';

function OfferCard() {
  return (
    <div className="m-4 space-y-6 divide-y rounded-2xl border border-grayLineBased bg-white p-4">
      <div className="flex w-full items-center px-4 ">
        <p className="font-semibold text-black">Offer</p>
      </div>
      <div className="">
        <div className="mt-4  flex justify-between p-4">
          <dt className=" flex font-medium text-gray-900">
            PLorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh
            aliquet nullam odio maecenas semper. Dui felis suspendisse nunc, in
            vel enim nunc adipiscing donec. Pellentesque a magna venenatis ut ut
            semper dictum sit sem. Suspendisse lacus, pulvinar elit ipsum
            fermentum. Ipsum, orci, faucibus nibh et commodo et, dignissim erat.
            Adipiscing fusce et fames aliquam condimentum.{' '}
          </dt>
        </div>
        <div className="grid grid-cols-2 items-center p-4">
          <div className="flex flex-col">
            <p className="text-primary">Payment type</p>
            <p className="text-graySubtitle">paid</p>
          </div>
          <div className="flex flex-col">
            <p className="text-primary">Payment rate</p>
            <p className="text-graySubtitle">$35 / hour</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between space-x-2">
        <Button
          className=" mt-4 flex w-full items-center justify-center "
          type="submit"
          size="lg"
          variant="fill"
          value="Submit"
        >
          Accept offer
        </Button>
        <Button
          className=" mt-4 flex  w-full items-center justify-center "
          type="submit"
          size="lg"
          variant="outline"
          value="Submit"
        >
          Withdraw
        </Button>
      </div>
    </div>
  );
}

export default OfferCard;
