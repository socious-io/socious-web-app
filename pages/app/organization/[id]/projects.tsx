import React, {useMemo} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import dayjs from 'dayjs';
import useSWR from 'swr';
import {GeneralLayout} from 'layout';
import {Avatar, Button} from '@components/common';
import ProjectItem from '@components/common/UserProfile/RightPane/ProjectItem';
import {get} from 'utils/request';
import type {NextPage} from 'next';
import {Project} from '@models/project';
import {IOrganizationType} from 'models/organization';
import useInfiniteSWR from 'hooks/useInfiniteSWR/useInfiniteSWR';

const OrganizationProjects: NextPage = () => {
  const {query} = useRouter();

  const {data: organization} = useSWR<IOrganizationType>(
    `/orgs/by-shortname/${query.id}`,
    get,
  );

  const {flattenData, seeMore, loadMore} = useInfiniteSWR<Project>(
    organization?.id
      ? `/projects?identity_id=${organization.id}&status=ACTIVE`
      : null,
  );

  const flattenActiveProjects: Project[] = useMemo(() => {
    return flattenData
      ? flattenData.filter((project: Project) => project.status === 'ACTIVE')
      : [];
  }, [flattenData]);

  return (
    <GeneralLayout style={{marginBottom: '1.5rem'}}>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="md:w-2/6 ">
          <div className="max-h-min border border-grayLineBased bg-white px-4 py-6 md:rounded-xl">
            <Avatar
              size="xxl"
              className="p-2"
              type="organizations"
              src={organization?.image?.url}
            />
            <h1 className="font-worksans font-semibold">
              {organization?.name}
            </h1>
            <Link
              href={`/app/organization/${organization?.shortname ?? query}`}
            >
              <p className="font-worksans cursor-pointer text-sm text-primary">
                View my profile
              </p>
            </Link>
            <p className="py-4 text-sm">{organization?.bio}</p>
            <div className="font-woksans flex text-sm text-grayInputField">
              <p className="pr-4">{`${organization?.followings} following`}</p>
              <p>{`${organization?.followers} followers`}</p>
            </div>
          </div>
        </div>
        <div className="md:w-4/6">
          <div className="mx-2 mb-4 rounded-2xl border border-grayLineBased bg-white p-6 text-xl font-semibold">
            Projects
          </div>
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
                  date={dayjs(project?.updated_at)?.format('MMM D')}
                  border
                  first={index === 0}
                  last={flattenActiveProjects.length - 1 === index}
                />
              </a>
            </Link>
          ))}
          {seeMore && (
            <div className="flex justify-center">
              <Button
                variant="link"
                className="font-semibold text-primary"
                onClick={loadMore}
              >
                Load more
              </Button>
            </div>
          )}
        </div>
      </div>
    </GeneralLayout>
  );
};

export default OrganizationProjects;
