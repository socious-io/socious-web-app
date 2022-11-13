import React, {useCallback, useMemo, useState} from 'react';
import usePlacesAutocomplete, {getGeocode} from 'use-places-autocomplete';

import {Combobox} from '@components/common';
import {countryISOtoName} from 'utils/country';

/** Form fragment to edit country, city, and geoname_id */
export function LocationFormFragment({
  country,
  city,
  geonameId,
  setCountry,
  setCity,
  setGeonameId,
  errorCity,
  errorCountry,
}: any): JSX.Element {
  const [countryName, setCountryName] = useState<string>(
    countryISOtoName.get(country) ?? '',
  );

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
      componentRestrictions: {country: country},
    },
    debounce: 300,
    cacheKey: `${country}-restricted`,
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

  // Method to get Country-Code('jp') on countrySelected and calls 'handleSetCountry'.
  const onCountrySelected = useCallback(
    (data: any) => {
      setCountryName(data.name);
      getGeocode({placeId: data.id})
        .then((result: any) => {
          const countryCode = result?.[0]?.address_components[0]?.short_name;
          if (country) setCity('');
          setCountry(countryCode);
        })
        .catch((error: any) => console.error(error));
    },
    [setCity, setCountry, country],
  );

  return (
    <>
      <Combobox
        label="Country"
        selected={{
          id: country,
          name: countryName,
        }}
        onSelected={onCountrySelected}
        onChange={(e) => setCountryValue(e.currentTarget.value || '')}
        required
        name="country"
        items={filterCountries}
        placeholder="Country"
        errorMessage={errorCountry}
        className="my-6"
      />
      <Combobox
        label="City"
        selected={{id: geonameId, name: city}}
        onSelected={setCity}
        onChange={(e) => setCitiesValue(e.currentTarget.value || '')}
        required
        name="city"
        items={filterCities}
        placeholder="City"
        errorMessage={errorCity}
        className="my-6"
      />
    </>
  );
}
