import {FC} from 'react';
import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {Button, Dropdown} from '@components/common';
import {DATE_POSTED_OPTIONS, FilterOption} from '../filterOptions';
import {FilterOptionList, FilterOptionListProps} from './FilterOptionList';

export const ProjectOptions: FC<FilterOptionListProps> = (props) => {
  return <FilterOptionList {...props} items={DATE_POSTED_OPTIONS} />;
};

interface ProjectsDropdownProps {
  onChange: (project: string) => void;
}

export const ProjectsDropdown: FC<ProjectsDropdownProps> = ({onChange}) => {
  return (
    <Dropdown
      display={
        <Button
          size="sm"
          variant="ghost"
          rightIcon={() => <ChevronDownIcon className="w-4" />}
        >
          Projects
        </Button>
      }
    >
      <ProjectOptions onChange={onChange} useMenuItem />
    </Dropdown>
  );
};
