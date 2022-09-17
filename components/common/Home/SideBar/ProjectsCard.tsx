import {
  FolderIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import {FC} from 'react';
import Link from 'next/link';

interface ProjectsCardProps {
  isOrganization?: boolean;
  username: string;
}

const ProjectsCard: FC<ProjectsCardProps> = ({
  isOrganization = false,
  username,
}) => {
  return (
    <div className="space-y-4 rounded-2xl border border-grayLineBased bg-background p-4">
      <Link href={`/project`}>
        <label className="text-primary">Projects</label>
      </Link>
      <ul className="list-none space-y-4">
        {isOrganization ? (
          <>
            <li className="flex items-center space-x-4">
              <UserCircleIcon className="h-4" />
              <p>Created</p>
            </li>
            <li className="flex items-center space-x-4">
              <FolderIcon className="h-4" />
              <p>Archived</p>
            </li>
          </>
        ) : (
          <>
            <Link href={`/user/${username}/applied`} passHref>
              <li className="flex cursor-pointer items-center space-x-4">
                <ClipboardDocumentListIcon className="h-4" />
                <p>My applications</p>
              </li>
            </Link>
            <Link href={`/user/${username}/hired`} passHref>
              <li className="flex cursor-pointer items-center space-x-4">
                <FolderIcon className="h-4" />
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
