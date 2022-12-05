import {Avatar, Chip} from '@components/common';
import {Project} from 'models/project';
import Link from 'next/link';
import {
  ChevronRightIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import {getText} from '@socious/data';
import {FC} from 'react';
import {isoToHumanTime} from 'services/toHumanTime';
import {useFormattedLocation} from 'services/formatLocation';
import Markdown, {MarkdownToJSX} from 'markdown-to-jsx';
import Router from 'next/router';
import {EXPERIENCE_LEVEL_OPTIONS} from '@components/common/Search/filterOptions';

type ProjectCardProps = {
  project: Project;
  type?: 'NORMAL' | 'SEARCH';
  previewItem?: () => void;
};

type PaymentRange = (low?: string | null, high?: string | null) => JSX.Element;

export const GroupsOfChips: FC<{causes_tags?: string[]}> = ({causes_tags}) => {
  return (
    <div className="flex flex-row flex-wrap space-x-4">
      {causes_tags?.map((ct) => {
        return (
          <div key={`${ct}`} className="mt-1">
            <Chip
              content={`${getText('en', `PASSION.${ct}`)}`}
              contentClassName="text-secondary text-sm whitespace-nowrap"
            />
          </div>
        );
      })}
    </div>
  );
};

const convertMarkdownToJSX = (
  value: string,
  options?: MarkdownToJSX.Options,
): JSX.Element => {
  return value ? <Markdown options={options}>{value}</Markdown> : <></>;
};

export default function ProjectCard({
  project,
  type = 'NORMAL',
  previewItem,
}: ProjectCardProps) {
  const location = useFormattedLocation(project);
  console.log(project.title, ':---: ', project);

  const paymentRange: PaymentRange = function (low, high) {
    const isOfTypeVolunteer = project.project_type === 'VOLUNTEER';
    const hasTruthyValue = low && high;

    if (hasTruthyValue && !isOfTypeVolunteer) {
      return (
        <div className="flex flex-row">
          <p className="pl-2 text-sm text-graySubtitle ">{`$${low}-$${high} / hr`}</p>
        </div>
      );
    }
    return <></>;
  };
  return (
    <div
      className="cursor-pointer rounded-2xl border border-grayLineBased bg-white p-4"
      onClick={() =>
        previewItem && type === 'SEARCH'
          ? previewItem()
          : Router.push(`/app/projects/${project.id}`)
      }
    >
      <div className="space-y-6">
        <div className="flex flex-row items-center justify-between ">
          <Link href={`/app/organization/${project.identity_meta?.shortname}`}>
            <div className="flex flex-row space-x-2">
              <Avatar
                size={type === 'SEARCH' ? 'xl' : 'l'}
                type={'organizations'}
                src={project.identity_meta?.image}
              />
              <div className="flex flex-col justify-center">
                <p className="text-black">{project.identity_meta?.name}</p>
                {location && <p className="text-graySubtitle">{location}</p>}
              </div>
            </div>
          </Link>
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
          {paymentRange(
            project.payment_range_lower,
            project.payment_range_higher,
          )}
          {[0, 1, 2, 3, 4].includes(project.experience_level) && (
            <p className="pl-2 text-sm text-graySubtitle ">
              {
                EXPERIENCE_LEVEL_OPTIONS.find(
                  (item, index) => index === project.experience_level,
                )?.label
              }
            </p>
          )}
        </div>
        <div className="flex flex-row">
          <p className="my-1 text-sm">
            {project.description?.length > 200
              ? convertMarkdownToJSX(
                  project.description?.slice(0, 200) + '...',
                  {wrapper: 'article'},
                )
              : convertMarkdownToJSX(project.description, {wrapper: 'article'})}

            {project.description?.length > 200 && (
              <span className="text-secondary"> See more</span>
            )}
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
            className="flex text-sm font-normal text-gray-400"
            title={project.updated_at}
          >
            {isoToHumanTime(project.updated_at)}
          </dt>
        </div>
      </div>
    </div>
  );
}
