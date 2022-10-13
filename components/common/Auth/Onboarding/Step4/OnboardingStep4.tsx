// Packages
import {useCallback, useMemo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import usePlacesAutocomplete, {getGeocode} from 'use-places-autocomplete';

//Components
import {Button, Combobox} from '@components/common';

// Type
import {StepProps} from '@models/stepProps';

const OnboardingStep4 = ({onSubmit}: StepProps) => {
  const formMethods = useFormContext();
  const {handleSubmit, formState, setValue, watch} = formMethods;
  const [countryName, setCountryName] = useState<any>('');

  const selectedCountryCode = watch('country');
  const selectedCity = watch('city');

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

  //use-places-autocomplete: Method to get cities filtered by country. Returns Full city address.
  const {
    ready: cityReady,
    value: cityValue,
    suggestions: {status: cityStatus, data: cities},
    setValue: setCitiesValue,
  } = usePlacesAutocomplete({
    requestOptions: {
      language: 'en',
      types: ['locality', 'administrative_area_level_3'],
      componentRestrictions: {country: selectedCountryCode?.code},
    },
    debounce: 300,
    cacheKey: `${selectedCountryCode?.code}-restricted`,
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

  // Creating [] of cities for Combobox
  const filterCities = useMemo(
    () =>
      cities.map(({place_id, description, structured_formatting}) => ({
        id: place_id,
        name: structured_formatting.main_text || description,
      })) || [{id: 1, name: 'Tokyo'}],
    [cities],
  );

  //form-hook: Method for applying city to 'city'
  const handleSetCity = useCallback(
    (data: any) => {
      setValue('city', data?.name, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [setValue],
  );

  //form-hook: Method for applying country to 'country'
  const handleSetCountry = useCallback(
    (countryCode: any) => {
      setValue('country', countryCode, {
        shouldValidate: true,
        shouldDirty: true,
      });
      if (selectedCity) handleSetCity('');
    },
    [handleSetCity, selectedCity, setValue],
  );

  // Method to get Country-Code('jp') on countrySelected and calls 'handleSetCountry'.
  const onCountrySelected = useCallback(
    (data: any) => {
      getGeocode({placeId: data.id})
        .then((result: any) => {
          const countryCode =
            result?.[0]?.address_components[0]?.short_name?.toLowerCase();
          if (selectedCountryCode?.code) handleSetCity('');
          handleSetCountry({code: countryCode, name: data.name});
        })
        .catch((error: any) => console.error(error));
    },
    [handleSetCity, handleSetCountry, selectedCountryCode],
  );

  console.log('SELECTED COUNTRY :--: ', selectedCountryCode);

  return (
    <form
      onSubmit={handleSubmit(() => onSubmit(selectedCountryCode?.code))}
      className="flex grow flex-col justify-between pl-0 pr-10 sm:pl-10"
    >
      <div className="flex flex-col">
        {' '}
        <h1 className="font-helmet">What’s your location?</h1>
        <p className="text-base text-graySubtitle">
          Connect with other like-minded individuals and organizations around
          you
        </p>
        <Combobox
          label="Country"
          selected={{
            id: selectedCountryCode?.code ?? 123,
            name: selectedCountryCode?.name,
          }}
          onSelected={onCountrySelected}
          onChange={(e) => setCountryValue(e.currentTarget.value || '')}
          required
          name="country"
          items={filterCountries}
          placeholder="Country"
          errorMessage={formState?.errors?.['country']?.message}
          className="my-6"
        />
        <Combobox
          label="City"
          selected={{id: selectedCountryCode?.code ?? 123, name: selectedCity}}
          onSelected={handleSetCity}
          onChange={(e) => setCitiesValue(e.currentTarget.value || '')}
          required
          name="city"
          items={filterCities}
          placeholder="City"
          errorMessage={formState?.errors?.['city']?.message}
          className="my-6"
        />
      </div>
      <div className="-mx-16 divide-x border-t-2 border-b-grayLineBased pl-10 pb-12 sm:pl-0">
        <Button
          className="m-auto mt-4 flex w-full max-w-xs items-center justify-center align-middle "
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

export default OnboardingStep4;
