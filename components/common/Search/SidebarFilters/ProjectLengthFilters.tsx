import Checkbox from '@components/common/Checkbox/Checkbox';
import {useFormContext} from 'react-hook-form';
import {AccordionFilters} from './AccordionFilters';
import {PROJECT_LENGTH_OPTIONS} from '../filterOptions';

export const ProjectLengthFilters = () => {
  const {register} = useFormContext();

  return (
    <AccordionFilters
      title="Project length"
      content={PROJECT_LENGTH_OPTIONS.map((option) => (
        <div
          className={`cursor-pointer whitespace-nowrap capitalize`}
          key={option.value}
        >
          <Checkbox
            withAlignStart
            label={option.label}
            value={option.value}
            register={register('project_length')}
          />
        </div>
      ))}
    />
  );
};
