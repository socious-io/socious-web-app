import {FC} from 'react';
import {ProjectResults} from './ProjectResults';
import {PostResults} from './PostResults';
import {UserResults} from './UserResults';
import {OrganizationResults} from './OrganizationResults';
import {SortDropdown} from './SortDropdown';
import {useRouter} from 'next/router';
import {AdjustmentsHorizontalIcon} from '@heroicons/react/24/outline';
import {isMobile} from 'react-device-detect';

interface SearchResultItemsProps {
  type: string;
  total: number;
  items: any[];
  onChangeSortType?: () => void;
}

export const SearchResultItems: FC<SearchResultItemsProps> = ({
  type,
  total,
  items,
  onChangeSortType,
}) => {
  const route = useRouter();

  const updatePreviewQuery = (id: string) => {
    route.query.preview_id = id;
    route.push(route);
  };

  const updateSortQuery = (sort: string) => {
    route.query.sort = sort;
    route.push(route);
  };

  const renderResults = () => {
    switch (type) {
      case 'posts':
        return <PostResults items={items} />;
      case 'projects':
        return (
          <ProjectResults items={items} onPreviewItem={updatePreviewQuery} />
        );
      case 'users':
        return <UserResults items={items} onPreviewItem={updatePreviewQuery} />;
      case 'organizations':
        return (
          <OrganizationResults
            items={items}
            onPreviewItem={updatePreviewQuery}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="">
      <div className="flex h-14 items-center justify-between border-b border-grayLineBased">
        <label>
          {total} result{total !== 1 ? 's' : ''}
        </label>
        {/* {isMobile ? (
          <AdjustmentsHorizontalIcon
            className="w-5 text-primary"
            onClick={onChangeSortType}
          />
        ) : (
          <SortDropdown onChange={updateSortQuery} />
        )} */}
      </div>
      <div className="space-y-6 py-5">{renderResults()}</div>
    </div>
  );
};
