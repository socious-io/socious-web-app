import {FC} from 'react';
import Avatar from '@components/common/Avatar/Avatar';
import {GroupsOfChips} from '@components/common/Project/component/ProjectCard';
import {
  ChevronRightIcon,
  CurrencyDollarIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import {UserProfile} from '@models/profile';
import {formattedLocation, useFormattedLocation} from 'services/formatLocation';

interface UserResultsProps {
  items: UserProfile[];
  onPreviewItem: (id: string) => void;
}

export const UserResults: FC<UserResultsProps> = ({items, onPreviewItem}) => {
  return (
    <>
      {items.map((user) => (
        <div
          className="cursor-pointer rounded-2xl border border-grayLineBased bg-white p-4"
          key={user.id}
          onClick={() => onPreviewItem(user.id)}
        >
          <div className="space-y-6">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center space-x-2">
                <Avatar
                  size="xl"
                  type={'users'}
                  src={
                    typeof user.avatar !== 'string'
                      ? user.avatar?.url
                      : user.avatar
                  }
                />
                <div className="flex flex-col justify-center">
                  <p className="text-black">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-graySubtitle">{formattedLocation(user)}</p>
                </div>
              </div>
              <EllipsisHorizontalIcon className="w-5" />
            </div>
            {user.bio && (
              <div className="flex flex-row">
                <p className="text-sm">{user.bio}</p>
              </div>
            )}
            <div className="flex flex-row justify-between ">
              <div className="hide-scroll-bar whitespace-no-wrap w-7/10 flex  flex-row space-x-2  overflow-auto">
                <GroupsOfChips causes_tags={user.social_causes?.slice(0, 3)} />
              </div>
              <span className="ml-2 flex flex-row items-center">
                <ChevronRightIcon className="w-6 text-primary" />
              </span>
            </div>
            {/* RATE & VOLUNTEER */}
            {/* <div className="flex justify-between text-sm">
              <div className="flex">
                <CurrencyDollarIcon className="mr-1 w-5 text-primary" />
                $45-65 / hr
              </div>
              <div className="flex text-primary">
                <HeartIcon className="mr-1 w-5" />
                Open to volunteer
              </div>
            </div> */}
          </div>
        </div>
      ))}
    </>
  );
};
