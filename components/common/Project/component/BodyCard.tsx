import {Avatar} from '@components/common';
import {IUserProjects, Project} from 'models/project';
import Link from 'next/link';
import dayjs from 'dayjs';

type Props = {
  item: IUserProjects;
};

function BodyCard({item}: Props) {
  return (
    <Link href={`/app/projects/${item?.id}`}>
      <div className="m-4 cursor-pointer space-y-6 rounded-2xl border  border-grayLineBased bg-white p-4">
        <div className="">
          <p className="font-semibold text-primary">{item?.project?.title}</p>
        </div>
        <div className="flex flex-row items-center  space-x-2">
          <Avatar
            size="l"
            src={item?.organization?.meta?.image}
            type={'organizations'}
          />
          <p className="text-black">{item.organization?.meta?.name}</p>
        </div>
        <div>
          <p className="my-4 text-sm">
            {`${dayjs(item?.created_at)?.format('MMM D')} ${
              item?.expires_at
                ? `- ${dayjs(item?.expires_at)?.format('MMM D')}`
                : ''
            }`}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default BodyCard;
