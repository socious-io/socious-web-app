import Link from 'next/link';

// Components
import {Avatar} from '@components/common';
import BodyBox from '@components/common/Project/BodyBox/BodyBox';
import {WrapperWithHead} from '@components/pages/application/MyApplications/MyApplication';

// Types
import {Project} from '@models/project';
type ProjectInfoWithWrapperProps = {project: Project};

const ProjectInfoWithWrapper = ({project}: ProjectInfoWithWrapperProps) => {
  return (
    <WrapperWithHead isExpandable title="Project Info">
      <div className="space-y-3 p-4">
        <Link href={`/app/projects/${project.id}`}>
          <h1 className="text-base font-semibold">{project.title}</h1>
        </Link>
        <Link href={`/app/organization/${project.identity_meta.shortname}`}>
          <div className="flex cursor-pointer items-center space-x-2">
            <Avatar
              size="l"
              src={project.identity_meta.image}
              type="organizations"
            />
            <p className="text-black">{project.identity_meta.name}</p>
          </div>
        </Link>
        <BodyBox
          description={project.description}
          className="p-0"
          minCount={100}
        />
      </div>
    </WrapperWithHead>
  );
};

export default ProjectInfoWithWrapper;
