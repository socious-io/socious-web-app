import Checkbox from '@components/common/Checkbox/Checkbox';
import {useFormContext} from 'react-hook-form';
import {AccordionFilters} from './AccordionFilters';
import {EXPERIENCE_LEVEL_OPTIONS} from '../filterOptions';

export const ExperienceLevelFilters = () => {
  const {register} = useFormContext();

  return (
    <AccordionFilters
      title="Experience level"
      content={EXPERIENCE_LEVEL_OPTIONS.map((option) => (
        <div
          className={`cursor-pointer whitespace-nowrap capitalize`}
          key={option.value}
        >
          <Checkbox
            withAlignStart
            label={option.label}
            value={option.value}
            register={register('experience_level')}
          />
        </div>
      ))}
    />
  );
};
