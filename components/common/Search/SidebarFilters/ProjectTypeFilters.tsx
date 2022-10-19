import {useController} from 'react-hook-form';
import {AccordionFilters} from './AccordionFilters';
import {PROJECT_TYPE_OPTIONS} from '../filterOptions';

export const ProjectTypeFilters = () => {
  const {
    field: {onChange, value},
  } = useController({
    name: 'project_type',
    defaultValue: '',
  });

  return (
    <AccordionFilters
      title="Project type"
      content={PROJECT_TYPE_OPTIONS.map((option) => (
        <p
          onClick={() => onChange(option.value)}
          key={option.value}
          className={`cursor-pointer rounded px-2 py-1 hover:bg-primary hover:text-white ${
            value === option.value ? 'bg-primary text-white' : ''
          }`}
        >
          {option.label}
        </p>
      ))}
    />
  );
};
