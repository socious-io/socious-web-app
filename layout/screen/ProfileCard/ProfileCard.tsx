import {Avatar} from '@components/common';
import Link from 'next/link';
import {useMemo} from 'react';
import {twMerge} from 'tailwind-merge';

export interface ProfileCardProps {
  type?: 'DEFAULT' | 'MOBILE';
  content: string;
  name: string;
  username?: string;
  avatar?: string;
  following?: number;
  followers?: number;
  impact_points?: number;
  isUser?: boolean;
}

export function ProfileCard({
  type = 'DEFAULT',
  content,
  name,
  username,
  avatar,
  following,
  followers,
  impact_points,
  isUser,
}: ProfileCardProps) {
  const defaultCard = useMemo(() => type === 'DEFAULT', [type]);
  return (
    <div
      className={twMerge(
        'flex w-full space-y-4 p-4',
        !defaultCard
          ? 'border-0 bg-offWhite'
          : 'rounded-2xl border border-grayLineBased bg-background',
      )}
    >
      <div className="space-y-4">
        <div className={defaultCard ? 'space-y-4' : 'flex space-x-4'}>
          <Avatar
            src={avatar ?? ''}
            size={!defaultCard ? 'xl' : 'xxl'}
            type={isUser ? 'users' : 'organizations'}
          />
          <div>
            <p className="text-base font-semibold">
              {name || 'FirstName LastName'}
            </p>
            <Link href={`/app/${isUser ? 'user' : 'organization'}/${username}`}>
              <label className="cursor-pointer text-primary">
                View my profile
              </label>
            </Link>
          </div>
        </div>
        {defaultCard && (
          <div>
            <p className="text-sm">{content}</p>
          </div>
        )}
        <div className="flex flex-row space-x-2">
          <div>
            <p className="text-grayInputField">
              {following ?? 0} {isUser ? 'Connections' : 'Followings'}
            </p>
          </div>
          <div>
            <p className="text-grayInputField">{followers ?? 0} Followers</p>
          </div>
        </div>
        <div className="flex flex-row space-x-2">
          <div>
            <p className="text-grayInputField">
              Impact Points {impact_points ?? 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
