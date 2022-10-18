import ProjectCard from '@components/common/Project/component/ProjectCard';

import {FC} from 'react';

interface ProjectResultsProps {
  items: any[];
  onPreviewItem: (id: string) => void;
}

export const ProjectResults: FC<ProjectResultsProps> = ({
  items,
  onPreviewItem,
}) => {
  return (
    <>
      {items.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          type="SEARCH"
          previewItem={() => onPreviewItem(project.id)}
        />
      ))}
    </>
  );
};
