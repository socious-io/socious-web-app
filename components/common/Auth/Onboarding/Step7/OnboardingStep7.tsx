import {TextInput, Button} from '@components/common';
import Combobox from '@components/common/Combobox/Combobox';
import {StepProps} from '@models/stepProps';
import {useFormContext} from 'react-hook-form';
const OnboardingStep7 = ({onSubmit}: StepProps) => {
  const formMethods = useFormContext();
  const {handleSubmit, formState, register, setValue, getValues} = formMethods;
  const handleSetCountryNumber = (data: any) => {
    setValue('countryNumber', data, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
  const items = [{id: 1, name: 'Japan'}];
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex grow flex-col justify-between pl-0 pr-10 sm:pl-10"
    >
      <div className="flex grow flex-col">
        {' '}
        <h1 className="font-helmet mb-6">What’s your phone number?</h1>
        <p className="text-base text-graySubtitle">
          Share your phone number with organisations you’d like to work together
          with
        </p>
        <div className="flex flex-row  space-x-5  ">
          <Combobox
            selected={getValues('countryNumber')}
            onSelected={handleSetCountryNumber}
            items={items}
            name="countryNumber"
            placeholder="countryNumber"
            // errorMessage={formState?.errors?.['countryNumber']?.message}
            className="my-6  basis-3/12"
          />
          <TextInput
            placeholder="Phone number"
            register={register('phoneNumber')}
            errorMessage={formState?.errors?.['phoneNumber']?.message}
            containerClassName="basis-9/12 my-6"
            className="border-2 border-grayLineBased"
          />
        </div>
      </div>

      <div className="-mx-16 divide-x border-t-2 border-b-grayLineBased pl-10 sm:pl-0">
        <Button
          className="m-auto mt-4 mb-12 flex w-full max-w-xs items-center justify-center align-middle "
          type="submit"
          size="lg"
          variant="fill"
          value="Submit"
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default OnboardingStep7;
