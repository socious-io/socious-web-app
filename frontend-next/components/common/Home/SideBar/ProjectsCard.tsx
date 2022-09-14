import {FolderIcon, ClipboardListIcon, UserCircleIcon} from '@heroicons/react/outline';
import { FC } from 'react';

interface ProjectsCardProps {
  isOrganization?: boolean;
}

const ProjectsCard: FC<ProjectsCardProps> = ({
  isOrganization=false
}) => {
  return (
    <div className="p-4 space-y-4 rounded-2xl border border-grayLineBased bg-background">
      <label className='text-primary'>Projects</label>
      <ul className="list-none space-y-4">
        {
          isOrganization ? 
          <>
            <li className='flex space-x-4 items-center'>
              <UserCircleIcon className='h-4' />
              <label>Created</label>
            </li>
            <li className='flex space-x-4 items-center'>
              <FolderIcon className="h-4" />
              <label>Archived</label>
            </li>
          </>
          :
          <>
            <li className='flex space-x-4 items-center'>
              <ClipboardListIcon className='h-4' />
              <label>My applications</label>
            </li>
            <li className='flex space-x-4 items-center'>
              <FolderIcon className="h-4" />
              <label>Hired projects</label>
            </li>
          </>
        }
      </ul>
    </div>
  );
};

export default ProjectsCard;