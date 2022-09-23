import {Avatar} from '@components/common';
import {Button} from '@components/common';

function FeedBackCard() {
  return (
    <div className="m-4  divide-y rounded-2xl border border-grayLineBased bg-white ">
      <div className="flex w-full items-center p-4 ">
        <p className="font-semibold text-black">Feedback</p>
      </div>
      <div className=" p-4 ">
        <p className="py-2 font-semibold text-graySubtitle">Date</p>
        <div className="flex flex-row items-center space-x-2">
          <Avatar size="l" />
          <p className="font-semibold text-black">Organization</p>
        </div>
        <div className="mt-4  flex justify-between rounded-2xl bg-offWhite p-4">
          <dt className=" flex font-medium text-gray-900">
            PLorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh
            aliquet nullam odio maecenas semper. Dui felis suspendisse nunc, in
            vel enim nunc adipiscing donec. Pellentesque a magna venenatis ut ut
            semper dictum sit sem. Suspendisse lacus, pulvinar elit ipsum
            fermentum. Ipsum, orci, faucibus nibh et commodo et, dignissim erat.
            Adipiscing fusce et fames aliquam condimentum.{' '}
          </dt>
        </div>
      </div>
      <div className=" p-4 ">
        <p className="py-2 font-semibold text-graySubtitle ">Date</p>

        <div className="flex flex-row items-center space-x-2">
          <Avatar size="l" />
          <p className="font-semibold text-black">You</p>
        </div>

        <div className="mt-4  flex justify-between rounded-2xl bg-offWhite p-4">
          <dt className=" flex font-medium text-graySubtitle">
            No feedback given yet
          </dt>
        </div>
      </div>
      <Button
        className=" m-4 flex max-w-xs  items-center "
        type="submit"
        size="lg"
        variant="fill"
        value="Submit"
      >
        Give Feedback
      </Button>
    </div>
  );
}

export default FeedBackCard;
