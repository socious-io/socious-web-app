import {FC} from 'react';
import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {Button} from '@components/common';

interface SkillsDropdownProps {
  onClick: () => void;
}

export const SkillsDropdown: FC<SkillsDropdownProps> = ({onClick}) => {
  return (
    <Button
      size="sm"
      variant="ghost"
      rightIcon={() => <ChevronDownIcon className="w-4" />}
      onClick={onClick}
    >
      Skills
    </Button>
  );
};
