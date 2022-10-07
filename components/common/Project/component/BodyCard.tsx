import {Avatar} from '@components/common';
import {Project} from 'models/project';
import Link from 'next/link';
import dayjs from 'dayjs';

type Props = {
  item: Project;
  image?: string;
  name?: string;
};
function BodyCard({item, name, image}: Props) {
  return (
    <Link href={`/app/projects/${item?.id}`}>
      <div className="m-4 cursor-pointer space-y-6 rounded-2xl border  border-grayLineBased bg-white p-4">
        <div className="">
          <p className="font-semibold">{item?.title}</p>
        </div>
        <div className="flex flex-row items-center  space-x-2">
          <Avatar size="l" src={image} type={'organizations'} />
          <p className="text-black">{name}</p>
        </div>
        <div>
          <p className="my-4 text-sm">
            {`${dayjs(item?.created_at)?.format('MMM d')} ${
              item?.expires_at
                ? `- ${dayjs(item?.expires_at)?.format('MMM d')}`
                : ''
            }`}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default BodyCard;
