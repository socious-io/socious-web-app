import React, {useMemo} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

//libraries
import dayjs from 'dayjs';
import useSWR from 'swr';

//components
import {GeneralLayout} from 'layout';
import {Avatar} from '@components/common';
import ProjectItem from '@components/common/UserProfile/RightPane/ProjectItem';

// Utils/Services
import {get} from 'utils/request';

//types
import type {NextPage} from 'next';
import {IProjectsResponse, Project} from '@models/project';
import {IOrganizationType} from 'models/organization';

const OrganizationProjects: NextPage = () => {
  const {query} = useRouter();
  const {data: organization} = useSWR<IOrganizationType>(
    `/orgs/by-shortname/${query.id}`,
    get,
  );

  const {data: projects} = useSWR<IProjectsResponse>(
    organization ? `/projects?identity=${organization.id}` : null,
    get,
  );

  const flattenActiveProjects: Project[] = useMemo(() => {
    return projects
      ? projects.items
          // .map((projectList: any) => projectList.items)
          .filter((project: Project) => project.status === 'ACTIVE')
      : [];
  }, [projects]);

  return (
    <GeneralLayout style={{marginBottom: '1.5rem'}}>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="md:w-2/6 ">
          <div className="max-h-min border border-grayLineBased bg-white px-4 py-6 md:rounded-xl">
            <Avatar size="xxl" className="p-2" />
            <h1 className="font-worksans font-semibold">Organization</h1>
            <p className="font-worksans cursor-pointer text-sm text-primary">
              View my profile
            </p>
            <p className="py-4 text-sm">{organization?.bio}</p>
            <div className="font-woksans flex text-sm text-grayInputField">
              <p className="pr-4">{`${organization?.followers} following`}</p>
              <p>{`${organization?.followings} followers`}</p>
            </div>
          </div>
        </div>
        <div className="md:w-4/6">
          {flattenActiveProjects?.map((project: Project, index: number) => (
            <Link
              key={project.id}
              href={`/app/projects/${project.id}`}
              passHref
            >
              <a>
                <ProjectItem
                  title={project.title}
                  applicants={project.applicants}
                  hired={3}
                  dateRange={dayjs(project?.updated_at)?.format('MMM d')}
                  border
                  first={index === 0}
                  last={flattenActiveProjects.length - 1 === index}
                />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </GeneralLayout>
  );
};

export default OrganizationProjects;
