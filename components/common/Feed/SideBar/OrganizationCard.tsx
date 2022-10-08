import {UserCircleIcon, UserGroupIcon} from '@heroicons/react/24/outline';
import Team from '../../../../asset/icons/team.svg';
import Followers from '../../../../asset/icons/followers.svg';
import Image from 'next/dist/client/image';
import Link from 'next/link';

export interface OrgCardProps {
  username?: string;
}

const OrganizationCard = ({username}: OrgCardProps) => {
  return (
    <div className="space-y-4 rounded-2xl border border-grayLineBased bg-background p-4">
      <label className="text-primary">Organization</label>
      <ul className="list-none space-y-4">
        <li className="flex items-center space-x-4">
          <Link href={`/app/organization/${username}`} passHref>
            <label className="flex items-center space-x-4">
              <UserCircleIcon className="h-4" />
              <label>Profile</label>
            </label>
          </Link>
        </li>
        <li className="flex items-center space-x-4">
          <Link href={'/app/team'}>
            <label className="flex items-center space-x-4">
              <Image src={Team} alt="Logo - SVG" width="16px" height="16px" />
              <label>Team</label>
            </label>
          </Link>
        </li>
        <li className="flex items-center space-x-4">
          <Image src={Followers} alt="Logo - SVG" width="16px" height="16px" />
          <label>Followers</label>
        </li>
      </ul>
    </div>
  );
};

export default OrganizationCard;
