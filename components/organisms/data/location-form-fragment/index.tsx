import React, {useCallback, useMemo, useState} from 'react';

import {Combobox, ComboBoxSelectionType} from '@components/common';
import {countryISOtoName, countryOptions, formatCityName} from 'utils/geo';
import useSWR from 'swr';
import {GeoName} from '@models/geo';
import useInfiniteSWR, {
  TInfiniteResponse,
} from 'hooks/useInfiniteSWR/useInfiniteSWR';

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
  const [filterCity, setFilterCity] = useState<string | null>(null);

  const {flattenData: cities} = useInfiniteSWR<GeoName>(
    filterCity
      ? `/geo/locations/country/${country}?limit=100&search=${encodeURIComponent(
          filterCity,
        )}`
      : `/geo/locations/country/${country}?limit=100`,
  );

  // Creating [] of cities for Combobox
  const filterCities = useMemo(
    () =>
      cities?.map((city) => ({
        id: city.id,
        name: formatCityName(city),
      })) || [{id: 1, name: 'Loading…'}],
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
      setFilterCity(null);
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
        onChange={(e) => setFilterCity(e.currentTarget.value || null)}
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
