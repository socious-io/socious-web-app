import {FC} from 'react';
import {Menu} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {Button, Dropdown} from '@components/common';
import {DATE_POSTED_OPTIONS, FilterOption} from '../filterOptions';
import {FilterOptionList, FilterOptionListProps} from './FilterOptionList';

export const DatePostedOptions: FC<FilterOptionListProps> = (props) => {
  return <FilterOptionList {...props} items={DATE_POSTED_OPTIONS} />;
};

interface DatePostedDropdownProps {
  onChange: (option: string) => void;
}

export const DatePostedDropdown: FC<DatePostedDropdownProps> = ({onChange}) => {
  return (
    <Dropdown
      display={
        <Button
          size="sm"
          variant="ghost"
          rightIcon={() => <ChevronDownIcon className="w-4" />}
        >
          Date posted
        </Button>
      }
    >
      <DatePostedOptions onChange={onChange} useMenuItem />
    </Dropdown>
  );
};
