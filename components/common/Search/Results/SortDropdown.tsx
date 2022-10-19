import Dropdown from '@components/common/Dropdown/Dropdown';
import {Menu} from '@headlessui/react';
import {AdjustmentsHorizontalIcon} from '@heroicons/react/24/solid';
import {FC} from 'react';
import {SORT_OPTIONS} from '../filterOptions';
import {
  FilterOptionList,
  FilterOptionListProps,
} from '../TopbarFilters/FilterOptionList';

export const SortOptions: FC<FilterOptionListProps> = (props) => {
  return <FilterOptionList {...props} items={SORT_OPTIONS} />;
};

interface SortDropdownProps {
  onChange: (value: string) => void;
}

export const SortDropdown: FC<SortDropdownProps> = ({onChange}) => {
  return (
    <Dropdown
      display={<AdjustmentsHorizontalIcon className="w-5 text-primary" />}
      dropdownClass="transform -translate-x-full"
    >
      <SortOptions onChange={onChange} useMenuItem />
    </Dropdown>
  );
};
