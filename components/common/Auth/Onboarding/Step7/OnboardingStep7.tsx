import {TextInput, Button} from '@components/common';
import AutoCompleteInput from '@components/common/AutoCompleteInput/AutoCompleteInput';
import Combobox from '@components/common/Combobox/Combobox';
import {StepProps} from '@models/stepProps';
import {useCallback, useEffect, useState} from 'react';
import {geocodeByPlaceId} from 'react-google-places-autocomplete';
import {useFormContext} from 'react-hook-form';
import {getPhoneCode} from 'services/getPhoneCode';

interface OnboardingStep7Props extends StepProps {
  defaultCountry: string;
}

const OnboardingStep7 = ({onSubmit, defaultCountry}: OnboardingStep7Props) => {
  const formMethods = useFormContext();
  const {handleSubmit, formState, register, setValue, getValues} = formMethods;
  const [countryKey, setCountryKey] = useState<string>(defaultCountry);
  const [countryNumber, setCountryNumber] = useState<string>(
    getValues('countryNumber'),
  );

  const handleSetCountryNumber = useCallback(
    (data: any) => {
      setValue('countryNumber', data, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [setValue],
  );

  const onCountrySelected = useCallback((data: any) => {
    geocodeByPlaceId(data.value.place_id)
      .then((data: any) => {
        setCountryKey(
          data?.[0]?.address_components[0]?.short_name?.toLowerCase(),
        );
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (!countryKey) return;
    getPhoneCode(countryKey)
      .then((number) => {
        setCountryNumber(number);
        handleSetCountryNumber(number);
      })
      .catch((error) => console.error(error));
  }, [countryKey, handleSetCountryNumber]);

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
        <div className="flex space-x-5">
          {/* <Combobox
            selected={getValues('countryNumber')}
            onSelected={handleSetCountryNumber}
            items={items}
            name="countryNumber"
            placeholder="countryNumber"
            // errorMessage={formState?.errors?.['countryNumber']?.message}
            className="my-6  basis-3/12"
          /> */}
          <AutoCompleteInput
            selected={countryKey}
            onSelected={onCountrySelected}
            errorMessage={formState?.errors?.['country']?.message}
            autocompletionRequest={{
              types: ['country'],
            }}
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
