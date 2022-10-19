import {AccordionFilters} from './AccordionFilters';
import {PaymentTypeOptions} from './PaymentTypeOptions';

export const PaymentTypeFilters = () => {
  return (
    <AccordionFilters title="Payment type" content={<PaymentTypeOptions />} />
  );
};
