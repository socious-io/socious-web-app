import React, {useCallback, useMemo, useState} from 'react';
import usePlacesAutocomplete, {getGeocode} from 'use-places-autocomplete';

import {Combobox, ComboBoxSelectionType} from '@components/common';
import {countryISOtoName, countryOptions} from 'utils/country';

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

  // Creating [] of cities for Combobox
  const filterCities = useMemo(
    () =>
      cities.map(({place_id, description, structured_formatting}) => ({
        id: place_id,
        name: structured_formatting.main_text || description,
      })) || [{id: 1, name: 'Tokyo'}],
    [cities],
  );

  const onCountrySelected = useCallback(
    (data: ComboBoxSelectionType) => {
      setCountryName(data.name);
      setCountry(data.id);
      if (data.id != country) setCity('');
    },
    [setCity, setCountry, country],
  );

  const onCitySelected = useCallback(
    (data: ComboBoxSelectionType) => {
      setCity(data.name);
      setGeonameId(data.id);
    },
    [setCity, setGeonameId],
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
        required
        name="country"
        items={countryOptions}
        placeholder="Country"
        errorMessage={errorCountry}
        className="my-6"
      />
      <Combobox
        label="City"
        selected={{id: geonameId, name: city}}
        onSelected={onCitySelected}
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
