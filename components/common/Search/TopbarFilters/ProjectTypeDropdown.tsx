import {FC} from 'react';
import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {Button, Dropdown} from '@components/common';
import {FilterOption, PROJECT_TYPE_OPTIONS} from '../filterOptions';
import {FilterOptionList, FilterOptionListProps} from './FilterOptionList';

interface ProjectTypeOptionsProps {
  onChange?: (type: string) => void;
  renderItem?: (option: FilterOption) => JSX.Element;
}

export const ProjectTypeOptions: FC<FilterOptionListProps> = (props) => {
  return <FilterOptionList {...props} items={PROJECT_TYPE_OPTIONS} />;
};

interface ProjectTypeDropdownProps {
  onChange: (projectType: string) => void;
}

export const ProjectTypeDropdown: FC<ProjectTypeDropdownProps> = ({
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
          Project type
        </Button>
      }
    >
      <ProjectTypeOptions onChange={onChange} useMenuItem />
    </Dropdown>
  );
};
