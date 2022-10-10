import Checkbox from '@components/common/Checkbox/Checkbox';
import {useFormContext} from 'react-hook-form';
import {AccordionFilters} from './AccordionFilters';
import {POSTED_BY_OPTIONS} from '../filterOptions';

export const PostedbyFilters = () => {
  const {register} = useFormContext();

  return (
    <AccordionFilters
      title="Posted by"
      content={POSTED_BY_OPTIONS.map((option) => (
        <div
          className={`cursor-pointer whitespace-nowrap capitalize`}
          key={option.value}
        >
          <Checkbox
            withAlignStart
            label={option.label}
            value={option.value}
            register={register('posted_by')}
          />
        </div>
      ))}
    />
  );
};
