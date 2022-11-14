import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {Combobox, ComboBoxSelectionType} from '@components/common';
import {countryISOtoName, countryOptions, formatCityName} from 'utils/geo';
import {GeoName} from '@models/geo';
import useInfiniteSWR, {
  TInfiniteResponse,
} from 'hooks/useInfiniteSWR/useInfiniteSWR';
import {FieldError, Merge, FieldErrorsImpl} from 'react-hook-form';
import {get} from 'utils/request';

export interface LocationFormFragmentProps {
  country: string | null;
  city: string | null;
  geonameId: number | null;
  setCountry: (value: string) => void;
  setCity: (value: string) => void;
  setGeonameId: (value: number) => void;
  errorCity?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  errorCountry?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  allowWorldwide?: boolean;
  allowCityClear?: boolean;
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
  allowWorldwide = false,
  allowCityClear = false,
}: LocationFormFragmentProps): JSX.Element {
  const [countryName, setCountryName] = useState<string>(
    country ? countryISOtoName.get(country) ?? '' : '',
  );
  const [filterCity, setFilterCity] = useState<string | null>(null);

  // handle old profiles/projects that have no geoname_id
  useEffect(() => {
    if (city && country && !geonameId && setGeonameId) {
      const set = setGeonameId;
      async function fillGeoID() {
        const {items: cities} = await get<TInfiniteResponse<GeoName>>(
          `/geo/locations/country/${country}?search=${encodeURIComponent(
            city as string,
          )}&sort=-population`,
        );
        for (const candidate of cities) {
          if (candidate.name === city) {
            set(candidate.id);
            return;
          }
        }
        if (cities.length) set(cities[0].id);
      }
      fillGeoID();
    }
  }, [city, country, geonameId, setGeonameId]);

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
    },
    [setCountry],
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
      <input type="hidden" name="geoname_id" value={geonameId || ''} />
    </>
  );
}
