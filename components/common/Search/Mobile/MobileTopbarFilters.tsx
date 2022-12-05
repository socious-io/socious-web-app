import {FC} from 'react';
import {useRouter} from 'next/router';
import Button from '@components/common/Button/Button';
import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {ResetFilters} from '../TopbarFilters/ResetFilters';
import {SEARCH_TYPE_OPTIONS} from '../filterOptions';

interface MobileTopbarFiltersProps {
  onShowFilter: (filterType: FilterType) => void;
  onResetFilters: () => void;
}

export type FilterType =
  | 'all_filters'
  | 'search_types'
  | 'social_causes'
  | 'skills'
  | 'date_posted'
  | 'posted_by'
  | 'location'
  | 'user_type'
  | 'organization_type'
  | 'project_type'
  | 'projects'
  | 'payment_type';

export const MobileTopbarFilters: FC<MobileTopbarFiltersProps> = ({
  onShowFilter,
  onResetFilters,
}) => {
  const route = useRouter();
  const {type = ''} = route.query;

  const selectedSearchType = SEARCH_TYPE_OPTIONS.find(
    (opt) => opt.value === type,
  );

  const renderFilters = () => {
    switch (type) {
      case 'posts':
        return (
          <>
            {/* <Button
              size="sm"
              variant="ghost"
              rightIcon={() => <ChevronDownIcon className="w-4" />}
              onClick={() => onShowFilter('date_posted')}
            >
              Date posted
            </Button> */}
            <Button
              size="sm"
              variant="ghost"
              rightIcon={() => <ChevronDownIcon className="w-4" />}
              onClick={() => onShowFilter('social_causes')}
            >
              Social Causes
            </Button>
            {/* <Button
              size="sm"
              variant="ghost"
              rightIcon={() => <ChevronDownIcon className="w-4" />}
              onClick={() => onShowFilter('posted_by')}
            >
              Posted by
            </Button> */}
          </>
        );
      case 'users':
        return (
          <>
            <Button
              size="sm"
              variant="ghost"
              rightIcon={() => <ChevronDownIcon className="w-4" />}
              onClick={() => onShowFilter('social_causes')}
            >
              Social Causes
            </Button>
            <Button
              size="sm"
              variant="ghost"
              rightIcon={() => <ChevronDownIcon className="w-4" />}
              onClick={() => onShowFilter('skills')}
            >
              Skills
            </Button>
            <Button
              size="sm"
              variant="ghost"
              rightIcon={() => <ChevronDownIcon className="w-4" />}
              onClick={() => onShowFilter('location')}
            >
              Location
            </Button>
            {/* <Button
              size="sm"
              variant="ghost"
              rightIcon={() => <ChevronDownIcon className="w-4" />}
              onClick={() => onShowFilter('user_type')}
            >
              User type
            </Button> */}
            {/* <Button
              size="sm"
              variant="ghost"
              rightIcon={() => <ChevronDownIcon className="w-4" />}
              onClick={() => onShowFilter('payment_type')}
            >
              Payment type
            </Button> */}
          </>
        );
      case 'organizations':
        return (
          <>
            <Button
              size="sm"
              variant="ghost"
              rightIcon={() => <ChevronDownIcon className="w-4" />}
              onClick={() => onShowFilter('social_causes')}
            >
              Social Causes
            </Button>
            <Button
              size="sm"
              variant="ghost"
              rightIcon={() => <ChevronDownIcon className="w-4" />}
              onClick={() => onShowFilter('location')}
            >
              Location
            </Button>
            {/* <Button
              size="sm"
              variant="ghost"
              rightIcon={() => <ChevronDownIcon className="w-4" />}
              onClick={() => onShowFilter('projects')}
            >
              Projects
            </Button>
            <Button
              size="sm"
              variant="ghost"
              rightIcon={() => <ChevronDownIcon className="w-4" />}
              onClick={() => onShowFilter('organization_type')}
            >
              Organization type
            </Button> */}
          </>
        );
      case 'projects':
        return (
          <>
            {/* <Button
              size="sm"
              variant="ghost"
              rightIcon={() => <ChevronDownIcon className="w-4" />}
              onClick={() => onShowFilter('date_posted')}
            >
              Date posted
            </Button> */}
            <Button
              size="sm"
              variant="ghost"
              rightIcon={() => <ChevronDownIcon className="w-4" />}
              onClick={() => onShowFilter('social_causes')}
            >
              Social Causes
            </Button>
            <Button
              size="sm"
              variant="ghost"
              rightIcon={() => <ChevronDownIcon className="w-4" />}
              onClick={() => onShowFilter('skills')}
            >
              Skills
            </Button>
            {/* <Button
              size="sm"
              variant="ghost"
              rightIcon={() => <ChevronDownIcon className="w-4" />}
              onClick={() => onShowFilter('project_type')}
            >
              Project type
            </Button> */}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="top-18 fixed left-0 z-10 flex h-14 w-full items-center justify-center border-b border-grayLineBased bg-white md:top-16 md:justify-start">
      <div className="container mx-6 flex w-full max-w-5xl items-center gap-2 overflow-x-auto sm:mx-2 md:mx-auto md:justify-center md:overflow-x-visible md:px-0">
        <Button
          size="sm"
          rightIcon={() => <ChevronDownIcon className="w-4" />}
          onClick={() => onShowFilter('search_types')}
        >
          {selectedSearchType?.label}
        </Button>
        {renderFilters()}
        <Button
          size="sm"
          variant="ghost"
          rightIcon={() => <ChevronDownIcon className="w-4" />}
          onClick={() => onShowFilter('all_filters')}
        >
          All filters
        </Button>
        <ResetFilters onClick={onResetFilters} />
      </div>
    </div>
  );
};
