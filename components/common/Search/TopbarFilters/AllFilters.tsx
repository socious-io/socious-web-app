import {FC} from 'react';
import {Button} from '@components/common';
import {FunnelIcon} from '@heroicons/react/24/outline';

interface AllFiltersProps {
  onClick: () => void;
  selected: boolean;
}

export const AllFilters: FC<AllFiltersProps> = ({onClick, selected}) => {
  return (
    <Button
      size="sm"
      variant={selected ? undefined : 'ghost'}
      rightIcon={() => <FunnelIcon className="w-4" />}
      onClick={onClick}
    >
      All Filters
    </Button>
  );
};
