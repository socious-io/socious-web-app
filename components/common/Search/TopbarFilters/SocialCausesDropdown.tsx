import {FC} from 'react';
import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {Button} from '@components/common';

interface SocialCausesDropdownProps {
  onClick: () => void;
}

export const SocialCausesDropdown: FC<SocialCausesDropdownProps> = ({
  onClick,
}) => {
  return (
    <Button
      size="sm"
      variant="ghost"
      rightIcon={() => <ChevronDownIcon className="w-4" />}
      onClick={onClick}
    >
      Social Causes
    </Button>
  );
};
