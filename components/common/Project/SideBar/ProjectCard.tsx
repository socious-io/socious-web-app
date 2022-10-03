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

const ProjectCard: FC<ProjectsCardProps> = ({
  isOrganization = false,
  username,
}) => {
  return (
    <div className="space-y-4 rounded-2xl border border-grayLineBased bg-background p-4">
      <Link href="/app/projects">
        <label className="text-primary">Project</label>
      </Link>
      <ul className="list-none space-y-4">
        <>
          <Link href={`/app/projects/created/overview/${username}`} passHref>
            <li className="flex items-center space-x-4">
              <UserCircleIcon className="h-4" />
              <p>Overview</p>
            </li>
          </Link>
          <Link href={`/app/projects/created/applicants/${username}`} passHref>
            <li className="flex items-center space-x-4">
              <FolderIcon className="h-4" />
              <p>Applicants</p>
            </li>
          </Link>
          {/* <Link href={`/app/projects/created/hired/${username}`} passHref>
            <li className="flex items-center space-x-4">
              <FolderIcon className="h-4" />
              <p>Hired</p>
            </li>
          </Link> */}
        </>
      </ul>
    </div>
  );
};

export default ProjectCard;
