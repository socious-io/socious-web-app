import {
  FolderIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import {FC} from 'react';
import Link from 'next/link';
import {twMerge} from 'tailwind-merge';

export interface ProjectsCardProps {
  type?: 'DEFAULT' | 'MOBILE';
  isOrganization?: boolean;
  username: string;
}

const ProjectsCard: FC<ProjectsCardProps> = ({
  type = 'DEFAULT',
  isOrganization = false,
  username,
}) => {
  return (
    <div
      className={twMerge(
        'space-y-4 border-grayLineBased p-4',
        type === 'MOBILE' ? 'bg-offWhite' : 'rounded-2xl border bg-background',
      )}
    >
      <Link href="/app/projects">
        <label className="text-primary">Projects</label>
      </Link>
      <ul className="list-none space-y-4">
        {isOrganization ? (
          <>
            <Link href={`/app/projects/created`} passHref>
              <li className="flex cursor-pointer items-center space-x-4">
                <UserCircleIcon className="h-5" />
                <p>Created</p>
              </li>
            </Link>
            <li className="flex cursor-pointer items-center space-x-4">
              <FolderIcon className="h-5" />
              <p>Archived</p>
            </li>
          </>
        ) : (
          <>
            <Link href={`/app/projects/applications/${username}`} passHref>
              <li className="flex cursor-pointer items-center space-x-4">
                <ClipboardDocumentListIcon className="h-5" />
                <p>My applications</p>
              </li>
            </Link>
            <Link href={`/app/projects/hired/${username}`} passHref>
              <li className="flex cursor-pointer items-center space-x-4">
                <FolderIcon className="h-5" />
                <p>Hired projects</p>
              </li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default ProjectsCard;
