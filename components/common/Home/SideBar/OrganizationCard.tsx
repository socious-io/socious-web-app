import {UserCircleIcon, UserGroupIcon} from '@heroicons/react/outline';
import Team from "../../../../asset/icons/team.svg";
import Followers from "../../../../asset/icons/followers.svg";
import Image from 'next/dist/client/image';


const OrganizationCard = () => {
  return (
    <div className="p-4 space-y-4 rounded-2xl border border-grayLineBased bg-background">
    <label className='text-primary'>Organization</label>
    <ul className="list-none space-y-4">
      <li className='flex space-x-4 items-center'>
        <UserCircleIcon className='h-4' />
        <label>Profile</label>
      </li>
      <li className='flex space-x-4 items-center'>
      <Image
        src={Team}
        alt="Logo - SVG"
        width="16px"
        height="16px"
      />
        <label>Team</label>
      </li>
      <li className='flex space-x-4 items-center'>
      <Image
        src={Followers}
        alt="Logo - SVG"
        width="16px"
        height="16px"
      />
        <label>Followers</label>
      </li>
    </ul>
          
  </div>
  );
};

export default OrganizationCard;