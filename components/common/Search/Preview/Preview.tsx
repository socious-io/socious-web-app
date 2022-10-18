import {FC} from 'react';
import {twMerge} from 'tailwind-merge';
import {OrganizationPreview} from './OrganizationPreview';
import {ProjectPreview} from './ProjectPreview';
import {UserPreview} from './UserPreview';

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
  const renderPreview = () => {
    switch (type) {
      case 'organizations':
        return <OrganizationPreview id={id} />;
      case 'projects':
        return <ProjectPreview id={id} />;
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
