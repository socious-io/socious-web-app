import React, {useState, useMemo, useCallback} from 'react';

//components
import Title from '../components/Title';
import InputFiled from '@components/common/InputFiled/InputFiled';
import {Button, Combobox} from '@components/common';
import FormTitle from '../components/FormTitle';
import TextArea from '@components/common/TextArea/TextArea';

//libraries
import {useFormContext} from 'react-hook-form';
import usePlacesAutocomplete, {getGeocode} from 'use-places-autocomplete';

//interfaces
import {StepProps} from '@models/stepProps';

const BasicInfo = ({onSubmit}: StepProps) => {
  const [countryName, setCountryName] = useState<any>('');

  const formMethods = useFormContext();
  const {register, handleSubmit, formState, watch, setValue} = formMethods;

  const selectedCountryCode = watch('country');
  const selectedCity = watch('city');

  ///////////////////////////////////////////////////////////////////////////
  //   **********   get list of cities & countries & methodes    **********//
  ///////////////////////////////////////////////////////////////////////////

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

  /*use-places-autocomplete: Method to get cities filtered by 
   country. Returns Full city address.*/
  const {
    ready: cityReady,
    value: cityValue,
    suggestions: {status: cityStatus, data: cities},
    setValue: setCitiesValue,
  } = usePlacesAutocomplete({
    requestOptions: {
      language: 'en',
      types: ['locality', 'administrative_area_level_3'],
      componentRestrictions: {country: selectedCountryCode},
    },
    debounce: 300,
    cacheKey: `${selectedCountryCode}-restricted`,
  });

  //Creating list of countries for Combobox
  const filterCountries = useMemo(
    () =>
      countries.map(({place_id, description}) => ({
        id: place_id,
        name: description,
      })) || [{id: '1', name: 'Japan'}],
    [countries],
  );
  console.log(countries, 'con');

  // Creating list of cities for Combobox
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
      setCountryName(data.name);
      getGeocode({placeId: data.id})
        .then((result: any) => {
          const countryCode =
            result?.[0]?.address_components[0]?.short_name?.toLowerCase();
          handleSetCountry(countryCode);
        })
        .catch((error: any) => console.error(error));
    },
    [handleSetCountry],
  );

  return (
    <>
      <Title>Organization profile</Title>
      <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
        <div className="h-14 w-full grow overflow-y-scroll px-4 py-2">
          <FormTitle>Basic info</FormTitle>
          <InputFiled
            label="Organization name"
            type="text"
            placeholder="Organization name"
            register={register('name')}
            errorMessage={formState.errors?.['name']?.message}
            className="my-3"
            required
          />
          <TextArea
            label="Bio"
            placeholder="Your organization’s bio"
            register={register('bio')}
            errorMessage={formState.errors?.['bio']?.message}
            className="my-3"
            required
            rows={4}
          />
          <FormTitle>Contact</FormTitle>
          <InputFiled
            label="Organization email"
            type="text"
            placeholder="Organization email"
            register={register('email')}
            errorMessage={formState.errors?.['email']?.message}
            className="my-3"
            required
          />
          <Combobox
            label="Country"
            onSelected={onCountrySelected}
            onChange={(e) => setCountryValue(e.currentTarget.value || '')}
            required
            name="Country"
            items={filterCountries}
            placeholder="Country"
            errorMessage={formState?.errors?.['country']?.message}
            className="my-6"
          />

          <Combobox
            label="City"
            onSelected={handleSetCity}
            onChange={(e) => setCitiesValue(e.currentTarget.value || '')}
            required
            name="city"
            items={filterCities}
            placeholder="City"
            errorMessage={formState?.errors?.['city']?.message}
            className="my-6"
          />
          <InputFiled
            label="Address"
            type="text"
            placeholder="Address"
            register={register('address')}
            errorMessage={formState.errors?.['address']?.message}
            className="my-3"
          />
          <p className="font-base mb-3 mt-6 text-sm font-medium">
            Phone number
          </p>
          <div className="flex h-fit gap-x-4">
            <InputFiled
              type="text"
              placeholder="+000"
              register={register('mobile_country_code')}
              className="mb-3"
            />
            <InputFiled
              type="text"
              placeholder="Phone number"
              register={register('phone')}
              errorMessage={formState.errors?.['phone']?.message}
              className="mb-3 w-full"
            />
          </div>
          <InputFiled
            label="Website"
            type="text"
            placeholder="Website"
            register={register('website')}
            errorMessage={formState.errors?.['website']?.message}
            className="my-3"
          />
        </div>
        <footer className="w-full flex-none border-t border-grayLineBased pt-6 pb-28 sm:pb-10 sm:pt-4">
          <Button
            type="submit"
            className="mx-auto flex w-8/12 justify-center py-1.5 font-medium"
          >
            continue
          </Button>
        </footer>
      </form>
    </>
  );
};

export default BasicInfo;
