import Checkbox from '@components/common/Checkbox/Checkbox';
import {useFormContext} from 'react-hook-form';
import {AccordionFilters} from './AccordionFilters';
import {NETWORK_OPTIONS} from '../filterOptions';

export const NetworkFilters = () => {
  const {register} = useFormContext();

  return (
    <AccordionFilters
      title="Network"
      content={NETWORK_OPTIONS.map((option) => (
        <div
          className="cursor-pointer whitespace-nowrap py-1 capitalize"
          key={option.value}
        >
          <Checkbox
            withAlignStart
            label={option.label}
            value={option.value}
            register={register('network')}
          />
        </div>
      ))}
    />
  );
};
