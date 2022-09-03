import {FolderIcon, ClipboardListIcon} from '@heroicons/react/outline';

const ProjectsCard = () => {
  return (
    <div className="p-4 space-y-4 rounded-2xl border border-grayLineBased">
      <label className='text-primary'>Projects</label>
      <ul className="list-none space-y-4">
        <li className='flex space-x-4 items-center'>
          <ClipboardListIcon className='h-4' />
          <label>My applications</label>
        </li>
        <li className='flex space-x-4 items-center'>
          <FolderIcon className="h-4" />
          <label>Hired projects</label>
        </li>
      </ul>
    </div>
  );
};

export default ProjectsCard;