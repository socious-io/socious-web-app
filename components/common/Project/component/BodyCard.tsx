import {Avatar, Chip} from '@components/common';
import {Project} from 'models/project';
import Link from 'next/link';

type Props = {
  refixAddress: string;
};
function BodyCard({refixAddress}: Props) {
  return (
    <Link href={refixAddress ? refixAddress : 'javascript:;'}>
      <div className="m-4 space-y-6 rounded-2xl border border-grayLineBased  bg-white p-4">
        <div className="">
          <p className="font-semibold">Project Title</p>
        </div>
        <div className="flex flex-row items-center  space-x-2">
          <Avatar size="l" />
          <p className="text-black">Organization</p>
        </div>
        <div>
          <p className="my-4 text-sm">Mar 1 -Mar 10</p>
        </div>
      </div>
    </Link>
  );
}

export default BodyCard;
