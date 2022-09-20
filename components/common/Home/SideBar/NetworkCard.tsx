import {UsersIcon, UserGroupIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';

type NetworkCardProps = {
  username: string;
};

const NetworkCard = ({username}: NetworkCardProps) => {
  return (
    <div className="space-y-4 rounded-2xl border border-grayLineBased bg-background p-4">
      <label className="text-primary">Networking</label>
      <ul className="list-none space-y-4">
        <Link href={`/app/user/${username}/following`} passHref>
          <li className="flex cursor-pointer items-center space-x-4">
            <UsersIcon className="h-4" />
            <p>Connections</p>
          </li>
        </Link>
        <Link href={`/app/user/${username}/followers`} passHref>
          <li className="flex cursor-pointer items-center space-x-4">
            <UserGroupIcon className="h-4" />
            <p>Followers</p>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default NetworkCard;
