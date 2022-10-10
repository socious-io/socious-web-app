import {Combobox, Button} from '@components/common';
import {FC, useMemo, useCallback} from 'react';
import {FieldValues, useForm} from 'react-hook-form';
import {twMerge} from 'tailwind-merge';
import {useGoogleMapsScript} from 'use-google-maps-script';
import usePlacesAutocomplete, {getGeocode} from 'use-places-autocomplete';

interface LocationFormProps {
  className?: string;
  onSubmit: (data: FieldValues) => void;
}

export const LocationForm: FC<LocationFormProps> = ({className, onSubmit}) => {
  const {handleSubmit, formState, watch, setValue} = useForm();
  const country = watch('country');
  const city = watch('city');

  const {isLoaded} = useGoogleMapsScript({
    googleMapsApiKey: process.env['NEXT_PUBLIC_GOOGLE_API_KEY'] ?? '',
    libraries: ['places'],
  });

  const {
    suggestions: {data: countries},
  } = usePlacesAutocomplete({
    requestOptions: {language: 'en', types: ['country']},
    debounce: 300,
    cacheKey: 'country-restricted',
  });

  //to get cities filtered by country. Returns Full city address.
  const {
    suggestions: {data: cities},
  } = usePlacesAutocomplete({
    requestOptions: {
      language: 'en',
      types: ['locality', 'administrative_area_level_3'],
      componentRestrictions: {country: country},
    },
    debounce: 300,
    cacheKey: `${country}-restricted`,
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

  // Creating list of cities for Combobox
  const filterCities = useMemo(
    () =>
      cities.map(({place_id, description, structured_formatting}) => ({
        id: place_id,
        name: structured_formatting.main_text || description,
      })) || [{id: 1, name: 'Tokyo'}],
    [cities],
  );

  //set city in form
  const handleSetCity = useCallback(
    (data: any) => {
      setValue('city', data?.name, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [setValue],
  );

  //set country-code('jp') in form
  const handleSetCountry = useCallback(
    (countryCode: any) => {
      setValue('country', countryCode, {
        shouldValidate: true,
        shouldDirty: true,
      });
      if (city) handleSetCity('');
    },
    [handleSetCity, city, setValue],
  );

  const onCountrySelected = useCallback(
    (data: any) => {
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

  const onSubmitData = (data: FieldValues) => {
    console.log(data);
    onSubmit(data);
  };

  if (!isLoaded) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmitData)}
      className={twMerge('flex flex-col', className)}
    >
      <div className="flex-1 px-5">
        <Combobox
          label="Country"
          onSelected={onCountrySelected}
          onChange={(e) => setValue('country', e.currentTarget.value || '')}
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
          onChange={(e) => setValue('city', e.currentTarget.value || '')}
          required
          name="city"
          items={filterCities}
          placeholder="City"
          errorMessage={formState?.errors?.['city']?.message}
          className="my-6"
        />
      </div>
      <hr />
      <div className="flex justify-center p-4">
        <Button type="submit" className="w-full justify-center px-10 md:w-auto">
          Confirm
        </Button>
      </div>
    </form>
  );
};
