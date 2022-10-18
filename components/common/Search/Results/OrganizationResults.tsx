import Avatar from '@components/common/Avatar/Avatar';
import Button from '@components/common/Button/Button';
import {GroupsOfChips} from '@components/common/Project/component/ProjectCard';
import {
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import {IOrganization} from '@models/organization';
import {useRouter} from 'next/router';
import {FC} from 'react';

interface UserResultsProps {
  items: IOrganization[];
  onPreviewItem: (id: string) => void;
}

export const OrganizationResults: FC<UserResultsProps> = ({
  items,
  onPreviewItem,
}) => {
  return (
    <>
      {items.map((org) => (
        <div
          className="cursor-pointer rounded-2xl border border-grayLineBased bg-white p-4"
          key={org.id}
          onClick={() => onPreviewItem(org.id)}
        >
          <div className="space-y-6">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center space-x-2">
                <Avatar size="xl" type="organizations" src={org.image?.url} />
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-black">{org?.name}</p>
                  <p className="text-ellipsis text-graySubtitle">
                    {org?.address}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 text-primary">
                <EllipsisHorizontalIcon className="w-4" />
              </div>
            </div>
            {org.description?.length ? (
              <div className="flex flex-row">
                <p className="text-sm">
                  {org.description?.length > 200
                    ? `${org.description?.slice(0, 200)}...`
                    : org.description}
                  <span className="text-secondary">
                    {org.description?.length > 200 && ' See more'}
                  </span>
                </p>
              </div>
            ) : null}
            {org.social_causes?.length ? (
              <div className="flex flex-row justify-between ">
                <div className="hide-scroll-bar whitespace-no-wrap w-7/10 flex  flex-row space-x-2  overflow-auto">
                  <GroupsOfChips causes_tags={org.social_causes?.slice(0, 3)} />
                </div>
                <span className="ml-2 flex flex-row items-center">
                  <ChevronRightIcon className="w-6 text-primary" />
                </span>
              </div>
            ) : null}
            {/* HIRING BUTTON */}
            {/* <div className="flex justify-between text-sm">
              <Button
                size="sm"
                className="hover:bg--[#F00073] bg-[#F00073]  focus:bg-[#F00073]"
              >
                Hiring
              </Button>
            </div> */}
          </div>
        </div>
      ))}
    </>
  );
};
