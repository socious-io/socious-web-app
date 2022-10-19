import {FC} from 'react';
import Avatar from '@components/common/Avatar/Avatar';
import Chip from '@components/common/Chip/Chip';
import {useUserProfile} from '@hooks';
import {getText} from '@socious/data';
import Link from 'next/link';
import {useFormattedLocation} from 'services/formatLocation';

interface UserPreviewProps {
  id: string;
}

export const UserPreview: FC<UserPreviewProps> = ({id}) => {
  const {data: user} = useUserProfile(id);
  const location = useFormattedLocation(user);

  if (!user) return null;
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <Link href={`/app/user/${user.username}`}>
          <div className="flex cursor-pointer items-center space-x-2">
            <Avatar size="xl" type="users" src={user.avatar?.url} />
            <div className="flex flex-1 flex-col justify-center ">
              <p className="text-black">
                {user.first_name} {user.last_name}
              </p>
              {location && <p className=" text-graySubtitle">{location}</p>}
            </div>
          </div>
        </Link>
      </div>

      {user.bio?.length ? <p className="text-sm">{user.bio}</p> : null}

      {user.social_causes?.length ? (
        <>
          <hr />
          <div>
            <strong className="mb-2 block">Social causes</strong>
            <div className="flex flex-wrap gap-2">
              {user.social_causes?.map((ct: string) => {
                return (
                  <Chip
                    key={`${ct}`}
                    content={`${getText('en', `PASSION.${ct}`)}`}
                    contentClassName="text-secondary text-sm"
                  />
                );
              })}
            </div>
          </div>
        </>
      ) : null}

      {user.skills?.length ? (
        <>
          <hr />
          <div>
            <strong className="mb-2 block">Skills</strong>
            <div className="flex flex-wrap gap-2">
              {user.skills?.map((ct: string) => {
                return (
                  <Chip
                    key={`${ct}`}
                    content={`${getText('en', `SKILL.${ct}`)}`}
                    contentClassName="text-secondary text-sm"
                  />
                );
              })}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
