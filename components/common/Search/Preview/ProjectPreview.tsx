import useSWR from 'swr';

// Providers
import {useSkills} from '../Providers/SkillsProvider';
import {ProjectContextProvider} from '@components/common/Project/created/NewProject/context';

// Components
import ProjectDetail from '@components/common/Project/MainContent/DetailContent';

// Utils
import {get} from 'utils/request';

// Types
import {Project} from '@models/project';
interface ProjectPreviewProps {
  id: string;
}

export const ProjectPreview = ({id}: ProjectPreviewProps) => {
  const {skills} = useSkills();
  const {data} = useSWR<Project>(`/projects/${id}`, get);

  if (!data) {
    return <>Loading</>;
  }

  return (
    <ProjectContextProvider>
      <ProjectDetail
        skills={skills}
        projectId={id}
        className="rounded-none border-0"
        data={data}
      />
    </ProjectContextProvider>
  );
};
