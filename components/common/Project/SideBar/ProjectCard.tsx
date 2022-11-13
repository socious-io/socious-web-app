import {FC} from 'react';
import useSWR from 'swr';
import Link from 'next/link';

// Icons
import {FolderIcon, UserCircleIcon} from '@heroicons/react/24/outline';

// Hooks/Utils
import {useUser} from '@hooks';
import {get} from 'utils/request';

// Types
import {Project} from '@models/project';
interface ProjectsCardProps {
  projectDetail: Project;
}

const HiredLink = ({id}: {id: string}) => {
  const {data: missions} = useSWR<any>(
    `/projects/${id}/offers?status=APPROVED,HIRED`,
    get,
  );
  return (
    <Link href={`/app/projects/created/${id}/hired`} passHref>
      <li className="flex items-center space-x-4">
        <FolderIcon className="h-4" />
        <p>Hired ({missions?.total_count ?? 0})</p>
      </li>
    </Link>
  );
};

const ProjectCard: FC<ProjectsCardProps> = (props) => {
  const {projectDetail} = props;
  const {currentIdentity} = useUser();

  const applicantLink = (
    <Link
      href={`/app/projects/created/${projectDetail.id}/applicants`}
      passHref
    >
      <li className="flex items-center space-x-4">
        <FolderIcon className="h-4" />
        <p>Applicants ({projectDetail.applicants})</p>
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
        <label className="text-primary">{projectDetail.title}</label>
      </Link>
      <ul className="list-none space-y-4">
        <>
          <Link
            href={`/app/projects/created/overview/${projectDetail.id}`}
            passHref
          >
            <li className="flex items-center space-x-4">
              <UserCircleIcon className="h-4" />
              <p>Overview</p>
            </li>
          </Link>
          {showIfBelongToOrganization(applicantLink)}
          {showIfBelongToOrganization(<HiredLink id={projectDetail.id} />)}
        </>
      </ul>
    </div>
  );
};

export default ProjectCard;
