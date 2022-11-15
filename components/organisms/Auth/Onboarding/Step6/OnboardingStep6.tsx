// Packages
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import usePlacesAutocomplete, {getGeocode} from 'use-places-autocomplete';

// Components
import {InputFiled, Button, Combobox} from '@components/common';

// Services
import {getPhoneCode} from 'services/getPhoneCode';

// Types
import {StepProps} from '@models/stepProps';
interface OnboardingStep6Props extends StepProps {
  defaultCountry: string;
}

const OnboardingStep6 = ({onSubmit, defaultCountry}: OnboardingStep6Props) => {
  const formMethods = useFormContext();
  const {handleSubmit, formState, getValues, setValue, watch} = formMethods;

  const countryNumber = watch('countryNumber');
  const phoneNumber = watch('phoneNumber');
  const [countryKey, setCountryKey] = useState<string>(defaultCountry);

  //use-places-autocomplete: Method to get countries.
  const {
    ready: countryReady,
    value: countryValue,
    suggestions: {status: countryStatus, data: countries},
    setValue: setCountryValue,
  } = usePlacesAutocomplete({
    requestOptions: {language: 'en', types: ['country']},
    debounce: 300,
    cacheKey: 'country-restricted',
  });

  //Creating [] of countries for Combobox
  const filterCountries = useMemo(
    () =>
      countries.map(({place_id, description}) => ({
        id: place_id,
        name: description,
      })) || [{id: '1', name: 'Japan'}],
    [countries],
  );

  //form-hook: Method for applying country to 'country'
  const handleSetCountryNumber = useCallback(
    (data: string) => {
      setValue('countryNumber', data, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [setValue],
  );

  //form-hook: Method for applying 'phoneNumber'
  const handleSetPhoneNumber = useCallback(
    (phoneNumber: string) => {
      setValue('phoneNumber', phoneNumber.replaceAll(/[ -]/g, '') || '', {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [setValue],
  );

  // Request Number from Country Code and set it.
  const requestAndSetNumber = useCallback(
    (countryCode: string) => {
      getPhoneCode(countryCode)
        .then((number) => {
          handleSetCountryNumber(number);
        })
        .catch((error) => console.error(error));
    },
    [handleSetCountryNumber],
  );

  // Method to get Country-Code('jp') on countrySelected so we call call another API for 'countryNumber' for that country
  const onCountrySelected = useCallback(
    (data: any) => {
      getGeocode({placeId: data.id})
        .then((data: any) => {
          const countryCode: string =
            data?.[0]?.address_components[0]?.short_name?.toLowerCase();
          setCountryKey(countryCode);
          requestAndSetNumber(countryCode);
        })
        .catch((error) => console.error(error));
    },
    [requestAndSetNumber],
  );

  // Get 'countryNumber' for default and each 'countryKey' change. i.e. after each 'onCountrySelected'.
  useEffect(() => {
    console.table({countryKey, countryNumber});
    if (!countryKey || countryNumber) return;
    requestAndSetNumber(countryKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <div className="my-6 flex space-x-5">
          <Combobox
            selected={{id: countryKey, name: countryNumber}}
            onChange={(e) => setCountryValue(e.currentTarget.value || '')}
            onSelected={onCountrySelected}
            items={filterCountries}
            name="countryNumber"
            placeholder="Country Number"
            errorMessage={formState?.errors?.['countryNumber']?.message}
            className="basis-5/12 sm:basis-3/12"
          />
          <InputFiled
            placeholder="Phone number"
            value={getValues('phoneNumber')}
            onChange={(e) => handleSetPhoneNumber(e.currentTarget.value || '')}
            errorMessage={formState?.errors?.['phoneNumber']?.message}
            className="basis-7/12 sm:basis-9/12"
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

export default OnboardingStep6;
