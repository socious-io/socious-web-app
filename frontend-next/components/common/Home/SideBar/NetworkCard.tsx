import {UsersIcon, UserGroupIcon} from '@heroicons/react/outline';

const NetworkCard = () => {
  return (
    <div className="p-4 space-y-4 rounded-2xl border border-grayLineBased bg-background">
      <label className='text-primary'>Networking</label>
      <ul className="list-none space-y-4">
        <li className='flex space-x-4 items-center'>
          <UsersIcon className='h-4' />
          <label>Connections</label>
        </li>
        <li className='flex space-x-4 items-center'>
          <UserGroupIcon className="h-4" />
          <label>Followers</label>
        </li>
      </ul>
            
    </div>
  );
};

export default NetworkCard;