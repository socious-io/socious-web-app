import {FC} from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import {FolderIcon, UserCircleIcon} from '@heroicons/react/24/outline';
import {useUser} from '@hooks';
import {get} from 'utils/request';
import {Project} from '@models/project';
interface ProjectsCardProps {
  projectDetail: Project;
}

const ApplicantLink = ({id}: {id: string}) => {
  const {data: response} = useSWR<any>(`/projects/${id}/applicants`, get);
  return (
    <Link href={`/app/projects/created/${id}/applicants`} passHref>
      <li className="flex items-center space-x-4">
        <FolderIcon className="h-4" />
        <p>Applicants ({response?.total_count ?? 0})</p>
      </li>
    </Link>
  );
};

const HiredLink = ({id}: {id: string}) => {
  const {data: response} = useSWR<any>(`/projects/${id}/missions`, get);
  return (
    <Link href={`/app/projects/created/${id}/hired`} passHref>
      <li className="flex items-center space-x-4">
        <FolderIcon className="h-4" />
        <p>Hired ({response?.total_count ?? 0})</p>
      </li>
    </Link>
  );
};

const OfferedLink = ({id}: {id: string}) => {
  const {data: response} = useSWR<any>(`/projects/${id}/offers`, get);
  return (
    <Link href={`/app/projects/created/${id}/offered`} passHref>
      <li className="flex items-center space-x-4">
        <FolderIcon className="h-4" />
        <p>Offered ({response?.total_count ?? 0})</p>
      </li>
    </Link>
  );
};

const ProjectCard: FC<ProjectsCardProps> = (props) => {
  const {projectDetail} = props;
  const {currentIdentity} = useUser();

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
          {showIfBelongToOrganization(<ApplicantLink id={projectDetail.id} />)}
          {showIfBelongToOrganization(<OfferedLink id={projectDetail.id} />)}
          {showIfBelongToOrganization(<HiredLink id={projectDetail.id} />)}
        </>
      </ul>
    </div>
  );
};

export default ProjectCard;
