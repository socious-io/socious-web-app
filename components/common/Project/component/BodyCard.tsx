import {Avatar} from '@components/common';
import {Project} from 'models/project';
import Link from 'next/link';
import dayjs from 'dayjs';

type Props = {
  applicationId: string;
  project: Project;
  image?: string;
  name?: string;
  username: string;
};
function BodyCard({project, name, image, username, applicationId}: Props) {
  return (
    <Link href={`/app/projects/applications/${username}/${applicationId}`}>
      <div className="m-4 cursor-pointer space-y-6 rounded-2xl border  border-grayLineBased bg-white p-4">
        <Link href={`/app/projects/${project?.id}`}>
          <p className="inline-block font-semibold">{project?.title}</p>
        </Link>
        <div className="flex flex-row items-center space-x-2">
          <Avatar size="l" src={image} type={'organizations'} />
          <p className="text-black">{name}</p>
        </div>
        <div>
          <p className="my-4 text-sm">
            {`${dayjs(project?.created_at)?.format('MMM D')} ${
              project?.expires_at
                ? `- ${dayjs(project?.expires_at)?.format('MMM D')}`
                : ''
            }`}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default BodyCard;
