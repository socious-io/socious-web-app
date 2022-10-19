import {UserCircleIcon, UserGroupIcon} from '@heroicons/react/24/outline';
import Team from '../../../../asset/icons/team.svg';
import Followers from '../../../../asset/icons/followers.svg';
import Image from 'next/dist/client/image';
import Link from 'next/link';
import {twMerge} from 'tailwind-merge';

export interface OrgCardProps {
  type?: 'DEFAULT' | 'MOBILE';
  username?: string;
}

const OrganizationCard = ({username, type = 'DEFAULT'}: OrgCardProps) => {
  return (
    <div
      className={twMerge(
        'space-y-4 border-grayLineBased p-4',
        type === 'MOBILE' ? 'bg-offWhite' : 'rounded-2xl border bg-background',
      )}
    >
      <label className="text-primary">Organization</label>
      <ul className="list-none space-y-4">
        <li className="flex items-center space-x-4">
          <Link href={`/app/organization/${username}`} passHref>
            <label className="flex cursor-pointer items-center space-x-4">
              <UserCircleIcon className="h-5" />
              <p>Profile</p>
            </label>
          </Link>
        </li>
        <li className="flex items-center space-x-4">
          <Link href={'/app/team'}>
            <label className="flex cursor-pointer items-center space-x-4">
              <Image src={Team} alt="Logo - SVG" width="20px" height="20px" />
              <p>Team</p>
            </label>
          </Link>
        </li>
        <li className="flex items-center space-x-4">
          <Link href={'/app/followers'}>
            <label className="flex cursor-pointer items-center space-x-4">
              <Image
                src={Followers}
                alt="followers logo"
                width="20px"
                height="20px"
              />
              <p>Followers</p>
            </label>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default OrganizationCard;
