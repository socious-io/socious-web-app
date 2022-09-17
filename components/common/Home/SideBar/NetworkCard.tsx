import {UsersIcon, UserGroupIcon} from '@heroicons/react/outline';
import Link from 'next/link';

type NetworkCardProps = {
  username: string;
}

const NetworkCard = ({
  username
}: NetworkCardProps) => {
  return (
    <div className="p-4 space-y-4 rounded-2xl border border-grayLineBased bg-background">
      <label className='text-primary'>Networking</label>
      <ul className="list-none space-y-4">
        <Link href={`/user/${username}/following`} passHref>
          <li className='flex space-x-4 items-center cursor-pointer'>
            <UsersIcon className='h-4' />
            <p>Connections</p>
          </li>
        </Link>
        <Link href={`/user/${username}/followers`} passHref>
          <li className='flex space-x-4 items-center cursor-pointer'>
            <UserGroupIcon className="h-4" />
            <p>Followers</p>
          </li>
        </Link>
      </ul>
            
    </div>
  );
};

export default NetworkCard;