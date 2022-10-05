import React from 'react';
import {useRouter} from 'next/router';

//libraries
import useSWR from 'swr';

//components
import {GeneralLayout} from 'layout';
import {Avatar} from '@components/common';
import ProjectItem from '@components/common/UserProfile/RightPane/ProjectItem';

//types
import type {NextPage} from 'next';

import {get} from 'utils/request';

const OrganizationProjects: NextPage = () => {
  const {query} = useRouter();
  const {data: organization} = useSWR<any>(
    `/orgs/by-shortname/${query.id}`,
    get,
  );
  const {data: projects} = useSWR<any>(
    `/projects?identity=${organization?.id}`,
    get,
  );

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
          {projects?.items?.map((project: any, index: number) => (
            <ProjectItem
              key={project.id}
              title={project.title}
              applicants={project.applicants}
              hired={3}
              dateRange="Mar 12 - Mar 1"
              border
              first={index === 0}
              last={projects.items.length - 1 === index}
            />
          ))}
        </div>
      </div>
    </GeneralLayout>
  );
};

export default OrganizationProjects;
