import {FC} from 'react';
import ProjectDetail from '@components/common/Project/MainContent/DetailContent';
import {useSkills} from '../Providers/SkillsProvider';

interface ProjectPreviewProps {
  id: string;
}

export const ProjectPreview: FC<ProjectPreviewProps> = ({id}) => {
  const {skills} = useSkills();

  return (
    <ProjectDetail
      skills={skills}
      projectId={id}
      className="rounded-none border-0"
    />
  );
};
