import {FC} from 'react';
import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {Button, Dropdown} from '@components/common';
import {ORGANIZATION_TYPE_OPTIONS} from '../filterOptions';
import {FilterOptionList, FilterOptionListProps} from './FilterOptionList';

export const OrganizationTypeOptions: FC<FilterOptionListProps> = (props) => {
  return <FilterOptionList {...props} items={ORGANIZATION_TYPE_OPTIONS} />;
};

interface OrganizationTypeDropdownProps {
  onChange: (orgType: string) => void;
}

export const OrganizationTypeDropdown: FC<OrganizationTypeDropdownProps> = ({
  onChange,
}) => {
  return (
    <Dropdown
      display={
        <Button
          size="sm"
          variant="ghost"
          rightIcon={() => <ChevronDownIcon className="w-4" />}
        >
          Organization type
        </Button>
      }
    >
      <OrganizationTypeOptions onChange={onChange} useMenuItem />
    </Dropdown>
  );
};
