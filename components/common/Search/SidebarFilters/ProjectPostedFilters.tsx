import {useController} from 'react-hook-form';
import {AccordionFilters} from './AccordionFilters';
import {DATE_POSTED_OPTIONS} from '../filterOptions';

export const ProjectPostedFilters = () => {
  const {
    field: {onChange, value},
  } = useController({
    name: 'project_posted',
    defaultValue: '',
  });

  return (
    <AccordionFilters
      title="Project posted"
      content={DATE_POSTED_OPTIONS.map((option) => (
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
