import {FC} from 'react';
import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {Button} from '@components/common';

interface LocationDropdownProps {
  onClick: () => void;
}

export const LocationDropdown: FC<LocationDropdownProps> = ({onClick}) => {
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={onClick}
      rightIcon={() => <ChevronDownIcon className="w-4" />}
    >
      Location
    </Button>
  );
};
