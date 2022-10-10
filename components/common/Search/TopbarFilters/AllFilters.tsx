import {FC} from 'react';
import {Button} from '@components/common';
import {FunnelIcon} from '@heroicons/react/24/outline';

interface AllFiltersProps {
  onClick: () => void;
}

export const AllFilters: FC<AllFiltersProps> = ({onClick}) => {
  return (
    <Button
      size="sm"
      variant="ghost"
      rightIcon={() => <FunnelIcon className="w-4" />}
      onClick={onClick}
    >
      All Filters
    </Button>
  );
};
