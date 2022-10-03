import {Avatar, Chip} from '@components/common';
import {Project} from 'models/project';
import Link from 'next/link';

type Props = {
  refixAddress: string;
};
function BodyCard({refixAddress}: Props) {
  return (
    <Link href={refixAddress ? refixAddress : 'javascript:;'}>
      <div className="m-4 rounded-2xl border border-grayLineBased  bg-white p-4">
        <div className="">
          <p className="font-worksans font-semibold text-primary">
            Project Title
          </p>
        </div>
        <div className="mt-2 flex flex-row items-center space-x-2">
          <Avatar size="l" />
          <p className="font-worksans font-semibold text-black">Organization</p>
        </div>
        <div>
          <p className="font-worksans my-2 text-sm text-graySubtitle">
            Mar 1 - Mar 10
          </p>
        </div>
      </div>
    </Link>
  );
}

export default BodyCard;
