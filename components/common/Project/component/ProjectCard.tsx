import {Avatar, Chip} from '@components/common';
import {Project} from 'models/project';
import Link from 'next/link';
import {ChevronRightIcon} from '@heroicons/react/24/outline';
import {getText} from '@socious/data';
import {FC} from 'react';
import useSWR from 'swr';
import {get} from 'utils/request';

export const GroupsOfChips: FC<{causes_tags?: string[]}> = ({causes_tags}) => {
  return (
    <div className="flex flex-row space-x-4">
      {causes_tags?.map((ct) => {
        return (
          <Chip
            key={`${ct}`}
            content={`${getText('en', `PASSION.${ct}`)}`}
            contentClassName="text-secondary text-sm"
          />
        );
      })}
    </div>
  );
};
function ProjectCard({
  title,
  description,
  project_type,
  payment_type,
  country_id,
  causes_tags,
  identity_id,
}: Project) {
  const {data: orgData} = useSWR<any>(`/orgs/${identity_id}`, get);

  return (
    <div className="cursor-pointer rounded-2xl border border-grayLineBased bg-white p-4">
      <Link href={`/app/projects/73c1ceea-0bc3-416b-a528-ccc6ff2c4031`}>
        <div className="space-y-6">
          <div className="flex flex-row items-center justify-between ">
            <div className="flex flex-row space-x-2">
              <Avatar size="l" type={'organizations'} src={orgData?.image} />
              <div className="flex flex-col justify-center">
                <p className="text-black">{orgData?.name}</p>
                {country_id && (
                  <p className="text-graySubtitle">{country_id}</p>
                )}
              </div>
            </div>
          </div>
          <div className="">
            <p className="font-semibold">{title}</p>
          </div>
          <div className="mt-4 flex flex-row space-x-2 divide-x divide-solid divide-graySubtitle">
            {project_type && (
              <p className="text-sm text-graySubtitle ">
                {getText('en', `PROJECT.${project_type}`)}
              </p>
            )}
            {payment_type && (
              <p className="pl-2 text-sm text-graySubtitle ">
                {getText('en', `PAYMENT.${payment_type}`)}
              </p>
            )}
          </div>
          <div className="flex flex-row">
            <p className="my-4 text-sm">
              {description?.length > 200
                ? `${description?.slice(0, 200)}...`
                : description}
              <span className="text-secondary">
                {description?.length > 200 && ' See more'}
              </span>
            </p>
          </div>

          <div className="flex flex-row justify-between ">
            <div className="hide-scroll-bar whitespace-no-wrap w-7/10 flex  flex-row space-x-2  overflow-auto">
              <GroupsOfChips causes_tags={causes_tags?.slice(0, 3)} />
            </div>
            <span className="ml-2 flex flex-row items-center">
              <ChevronRightIcon className="w-6" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProjectCard;
