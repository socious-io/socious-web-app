import {UsersIcon, UserGroupIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {useMemo} from 'react';
import {twMerge} from 'tailwind-merge';

type NetworkCardProps = {
  type?: 'DEFAULT' | 'MOBILE';
  username: string;
};

const NetworkCard = ({username, type = 'DEFAULT'}: NetworkCardProps) => {
  const defaultCard = useMemo(() => type === 'DEFAULT', [type]);

  return (
    <div
      className={twMerge(
        'space-y-4 border-grayLineBased p-4 ',
        !defaultCard ? 'bg-offWhite' : 'rounded-2xl border bg-background',
      )}
    >
      <label className="text-primary">Networking</label>
      <ul className="list-none space-y-4">
        <Link href={`/app/user/${username}/following`} passHref>
          <li className="flex cursor-pointer items-center space-x-4">
            <UsersIcon className="h-5" />
            <p>Connections</p>
          </li>
        </Link>
        <Link href={`/app/user/${username}/followers`} passHref>
          <li className="flex cursor-pointer items-center space-x-4">
            <UserGroupIcon className="h-5" />
            <p>Followers</p>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default NetworkCard;
