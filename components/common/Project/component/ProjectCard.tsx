import {Avatar, Chip} from '@components/common';
import {Project} from 'models/project';
import Link from 'next/link';
import {ChevronRightIcon} from '@heroicons/react/24/outline';
import {getText} from '@socious/data';
import {FC} from 'react';
import useSWR from 'swr';
import {get} from 'utils/request';
import {isoToHumanTime} from 'services/toHumanTime';
import {getAllInfoByISO} from 'iso-country-currency';

export const GroupsOfChips: FC<{causes_tags?: string[]}> = ({causes_tags}) => {
  return (
    <div className="flex flex-row flex-wrap space-x-4">
      {causes_tags?.map((ct) => {
        return (
          <div key={`${ct}`} className="mt-1">
            <Chip
              content={`${getText('en', `PASSION.${ct}`)}`}
              contentClassName="text-secondary text-sm"
            />
          </div>
        );
      })}
    </div>
  );
};
function ProjectCard({project}: {project: Project}) {
  const countryInfo = project.country ? getAllInfoByISO(project.country) : null;

  return (
    <div className="cursor-pointer rounded-2xl border border-grayLineBased bg-white p-4">
      <Link href={`/app/projects/${project.id}`}>
        <div className="space-y-6">
          <div className="flex flex-row items-center justify-between ">
            <div className="flex flex-row space-x-2">
              <Avatar
                size="l"
                type={'organizations'}
                src={project.identity_meta?.image}
              />
              <div className="flex flex-col justify-center">
                <p className="text-black">{project.identity_meta?.name}</p>
                {project.country && (
                  <p className="text-graySubtitle">
                    {countryInfo?.countryName || ''}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="">
            <p className="font-semibold">{project.title}</p>
          </div>
          <div className="mt-4 flex flex-row space-x-2 divide-x divide-solid divide-graySubtitle">
            {project.project_type && (
              <p className="text-sm text-graySubtitle ">
                {getText('en', `PROJECT.${project.project_type}`)}
              </p>
            )}
            {project.payment_type && (
              <p className="pl-2 text-sm text-graySubtitle ">
                {getText('en', `PAYMENT.${project.payment_type}`)}
              </p>
            )}
          </div>
          <div className="flex flex-row">
            <p className="my-4 text-sm">
              {project.description?.length > 200
                ? `${project.description?.slice(0, 200)}...`
                : project.description}
              <span className="text-secondary">
                {project.description?.length > 200 && ' See more'}
              </span>
            </p>
          </div>

          <div className="flex flex-row justify-between ">
            <div className="hide-scroll-bar whitespace-no-wrap w-7/10 flex  flex-row space-x-2  overflow-auto">
              <GroupsOfChips causes_tags={project.causes_tags} />
            </div>
            <span className="ml-2 flex flex-row items-center">
              <ChevronRightIcon className="w-6" />
            </span>
          </div>
          <div className="mt-4 flex justify-between">
            <dt
              className="flex font-medium text-gray-900"
              title={project.created_at}
            >
              {isoToHumanTime(project.created_at)}
            </dt>
            {/* <div className="flex flex-row items-center ">
              <dd className="ml-2 text-sm text-secondary">connections</dd>
            </div> */}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProjectCard;
