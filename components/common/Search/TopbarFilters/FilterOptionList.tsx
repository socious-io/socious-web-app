import {Menu} from '@headlessui/react';
import {FC} from 'react';
import {FilterOption} from '../filterOptions';

export interface FilterOptionListProps {
  items?: FilterOption[];
  useMenuItem?: boolean;
  onChange?: (type: string) => void;
  renderItem?: (option: FilterOption) => JSX.Element;
}

export const FilterOptionList: FC<FilterOptionListProps> = ({
  items,
  useMenuItem,
  onChange,
  renderItem,
}) => {
  const renderDefaultItem = (item: FilterOption) => (
    <div
      key={item.value}
      className={`cursor-pointer whitespace-nowrap py-2 px-6 capitalize `}
      onClick={() => onChange?.(item.value)}
    >
      {item.label}
    </div>
  );

  const renderAsMenuItem = (item: FilterOption) => (
    <Menu.Item key={item.value}>
      {({active}) => (
        <div
          className={`cursor-pointer whitespace-nowrap py-2 px-6 capitalize ${
            active ? 'bg-primary text-white' : ''
          }`}
          onClick={() => onChange?.(item.value)}
        >
          {item.label}
        </div>
      )}
    </Menu.Item>
  );

  return (
    <>
      {items?.map(
        renderItem
          ? renderItem
          : useMenuItem
          ? renderAsMenuItem
          : renderDefaultItem,
      )}
    </>
  );
};
