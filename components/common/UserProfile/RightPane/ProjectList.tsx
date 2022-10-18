import React from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';

// Components
import ProjectItem from './ProjectItem';

// Types
import {Project} from '@models/project';
interface Props {
  list: any;
}

const ProjectList: React.FC<Props> = ({list}) => {
  return list.map((project: Project) => (
    <>
      <Link href={`/app/projects/${project.id}`} passHref key={project.id}>
        <a>
          <ProjectItem
            title={project.title}
            applicants={project.applicants}
            hired={2}
            date={dayjs(project?.updated_at)?.format('MMM d')}
          />
        </a>
      </Link>
      <hr className="border-grayLineBased" />
    </>
  ));
};

export default ProjectList;
