import Checkbox from '@components/common/Checkbox/Checkbox';
import InputFiled from '@components/common/InputFiled/InputFiled';
import {useFormContext} from 'react-hook-form';

export const PaymentTypeOptions = () => {
  const {register} = useFormContext();

  return (
    <div className="space-y-3">
      <Checkbox
        withAlignStart
        label={'Volunteer'}
        register={register('payment_type')}
        value="VOLUNTEER"
      />
      <div>
        <Checkbox
          withAlignStart
          label={'Hourly'}
          register={register('payment_type')}
          value="HOURLY"
        />
        <div className="pl-6">
          <label className="mt-3 mb-2 block">Payment range</label>
          <div className="grid grid-cols-2 gap-3">
            <InputFiled
              placeholder="Mininum"
              register={register('hourly.payment_range_lower')}
            />
            <InputFiled
              placeholder="Maximum"
              register={register('hourly.payment_range_higher')}
            />
          </div>
          <label className="mt-2 block text-graySubtitle">
            Prices will be shown in USD ($)
          </label>
        </div>
      </div>
      <div>
        <Checkbox
          withAlignStart
          label={'Fixed'}
          register={register('payment_type')}
          value="FIXED"
        />
        <div className="pl-6">
          <label className="mt-3 mb-2 block">Payment range</label>
          <div className="grid grid-cols-2 gap-3">
            <InputFiled
              placeholder="Mininum"
              register={register('fixed.payment_range_lower')}
            />
            <InputFiled
              placeholder="Maximum"
              register={register('fixed.payment_range_higher')}
            />
          </div>
          <label className="mt-2 block text-graySubtitle">
            Prices will be shown in USD ($)
          </label>
        </div>
      </div>
    </div>
  );
};
