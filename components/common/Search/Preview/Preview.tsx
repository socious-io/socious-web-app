import {FC} from 'react';
import {twMerge} from 'tailwind-merge';
import {OrganizationPreview} from './OrganizationPreview';
// import {ProjectPreview} from './ProjectPreview';
import ProjectDetail from '@components/common/Project/MainContent/DetailContent';
import {UserPreview} from './UserPreview';
import {useSkills} from '../Providers/SkillsProvider';
interface SearchResultPreviewProps {
  type: string;
  id: string;
  className?: string;
}

export const SearchResultPreview: FC<SearchResultPreviewProps> = ({
  type,
  id,
  className,
}) => {
  const {skills} = useSkills();

  const renderPreview = () => {
    switch (type) {
      case 'organizations':
        return <OrganizationPreview id={id} />;
      case 'projects':
        return (
          <ProjectDetail
            skills={skills}
            projectId={id}
            className="rounded-none border-0"
          />
        );
      case 'users':
        return <UserPreview id={id} />;
      default:
        return null;
    }
  };

  return (
    <div className={twMerge('h-full overflow-auto bg-white', className)}>
      {renderPreview()}
    </div>
  );
};
