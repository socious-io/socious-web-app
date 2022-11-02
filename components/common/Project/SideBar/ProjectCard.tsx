import {FolderIcon, UserCircleIcon} from '@heroicons/react/24/outline';
import {FC} from 'react';
import Link from 'next/link';
import {Project} from '@models/project';
import {useUser} from '@hooks';

interface ProjectsCardProps {
  username: string;
  projectDetail: Project;
}

const ProjectCard: FC<ProjectsCardProps> = (props) => {
  const {username, projectDetail} = props;
  const {currentIdentity} = useUser();

  const applicantLink = (
    <Link
      href={`/app/projects/created/${projectDetail.id}/applicants`}
      passHref
    >
      <li className="flex items-center space-x-4">
        <FolderIcon className="h-4" />
        <p>Applicants</p>
      </li>
    </Link>
  );

  const hiredLink = (
    <Link href={`/app/projects/created/${projectDetail.id}/hired`} passHref>
      <li className="flex items-center space-x-4">
        <FolderIcon className="h-4" />
        <p>Hired</p>
      </li>
    </Link>
  );

  const showIfBelongToOrganization = (
    link: JSX.Element,
  ): JSX.Element | null => {
    const projectBelongToSameOrg =
      currentIdentity?.id === projectDetail.identity_id;
    return projectBelongToSameOrg ? link : null;
  };

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
          {showIfBelongToOrganization(applicantLink)}
          {showIfBelongToOrganization(hiredLink)}
        </>
      </ul>
    </div>
  );
};

export default ProjectCard;
