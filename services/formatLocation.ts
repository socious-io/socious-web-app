import {useMemo} from 'react';
import {getAllInfoByISO} from 'iso-country-currency';

export interface DataWithLocation {
  country?: string;
  city?: string;
}

// Format profile or project location as City, Country or just Country
export function formattedLocation(data?: DataWithLocation) {
  if (!data) return '';
  const countryInfo = data.country ? getAllInfoByISO(data.country) : null;
  if (data.city && countryInfo)
    return `${data.city}, ${countryInfo.countryName}`;
  return countryInfo?.countryName || '';
}

// Same as formattedLocation but as a memoized hook
export function useFormattedLocation(data?: DataWithLocation) {
  return useMemo(() => formattedLocation(data), [data]);
}
