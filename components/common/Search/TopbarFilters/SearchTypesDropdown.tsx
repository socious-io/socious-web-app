import {FC} from 'react';
import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {Button, Dropdown} from '@components/common';
import {SEARCH_TYPE_OPTIONS} from '../filterOptions';
import {useUser} from '@hooks';
import {FilterOptionList, FilterOptionListProps} from './FilterOptionList';

const USER_SEARCH_TYPE_ORDER = ['projects', 'organizations', 'users', 'posts'];
const ORG_SEARCH_TYPE_ORDER = ['users', 'organizations', 'projects', 'posts'];

function useSearchTypeOptions() {
  const {currentIdentity} = useUser();
  const order =
    currentIdentity?.type === 'organizations'
      ? ORG_SEARCH_TYPE_ORDER
      : USER_SEARCH_TYPE_ORDER;

  return SEARCH_TYPE_OPTIONS.sort(
    (a, b) => order.indexOf(a.value) - order.indexOf(b.value),
  );
}

export const SearchTypeOptions: FC<FilterOptionListProps> = (props) => {
  const options = useSearchTypeOptions();

  return <FilterOptionList {...props} items={options} />;
};

interface SearchTypeOptionsProps {
  onChange?: (type: string) => void;
}

export const SearchTypesDropdown: FC<SearchTypesDropdownProps> = ({
  seletedType,
  onChange,
}) => {
  const selectedOption = SEARCH_TYPE_OPTIONS.find(
    (opt) => opt.value === seletedType,
  );

  return (
    <Dropdown
      display={
        <Button size="sm" rightIcon={() => <ChevronDownIcon className="w-4" />}>
          {selectedOption?.label}
        </Button>
      }
    >
      <SearchTypeOptions onChange={onChange} useMenuItem />
    </Dropdown>
  );
};
