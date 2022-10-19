import {FC} from 'react';
import {Button} from '@components/common';

interface ResetFiltersProps {
  onClick: () => void;
}

export const ResetFilters: FC<ResetFiltersProps> = ({onClick}) => {
  return (
    <Button size="sm" variant="ghost" onClick={onClick}>
      Reset
    </Button>
  );
};
