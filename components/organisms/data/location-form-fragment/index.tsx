import React, {SyntheticEvent, useCallback, useMemo, useState} from 'react';

import {Combobox, ComboBoxSelectionType} from '@components/common';
import {countryISOtoName, countryOptions, formatCityName} from 'utils/geo';
import {GeoName} from '@models/geo';
import useInfiniteSWR from 'hooks/useInfiniteSWR/useInfiniteSWR';
import {FieldError, Merge, FieldErrorsImpl} from 'react-hook-form';

export interface LocationFormFragmentProps {
  country: string | null;
  city: string | null;
  geonameId?: number | null;
  setCountry: (value: string) => void;
  setCity: (value: string) => void;
  setGeonameId?: (value: number) => void;
  errorCity?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  errorCountry?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

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
}: LocationFormFragmentProps): JSX.Element {
  const [countryName, setCountryName] = useState<string>(
    country ? countryISOtoName.get(country) ?? '' : '',
  );
  const [filterCity, setFilterCity] = useState<string | null>(null);

  const {
    flattenData: cities,
    loadMore,
    seeMore,
  } = useInfiniteSWR<GeoName>(
    filterCity
      ? `/geo/locations/country/${country}?limit=50&search=${encodeURIComponent(
          filterCity,
        )}`
      : `/geo/locations/country/${country}?limit=50`,
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
      setGeonameId && setGeonameId(Number(data.id));
    },
    [setCity, setGeonameId],
  );

  const onCityScroll = useCallback(
    (event: SyntheticEvent) => {
      if (seeMore) {
        const {scrollTop, scrollHeight, clientHeight} = event.currentTarget;
        if (scrollTop >= scrollHeight - clientHeight * 2) {
          loadMore();
        }
      }
    },
    [loadMore, seeMore],
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
        onScrollOptions={onCityScroll}
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
