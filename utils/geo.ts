import {getAllISOCodes} from 'iso-country-currency';

import {ComboBoxSelectionType} from '@components/common';
import {GeoName} from '@models/geo';

export interface CountryComboBoxSelectionType extends ComboBoxSelectionType {
  /** Lowercase name, for search/filter */
  lower: string;
}

export const countryISOtoName = new Map<string, string>();
export const countryNameToISO = new Map<string, string>();
export const countryOptions: Array<CountryComboBoxSelectionType> = [];

for (const iso of getAllISOCodes()) {
  countryISOtoName.set(iso.iso, iso.countryName);
  countryNameToISO.set(iso.countryName, iso.iso);
  countryOptions.push({
    id: iso.iso,
    name: iso.countryName,
    lower: iso.countryName.toLowerCase(),
  });
}

export const countryOptionsWithXW = [
  {name: 'Worldwide', id: 'XW', lower: 'worldwide'},
  ...countryOptions,
];

export function formatCityName(geoname: GeoName): string {
  const parts = [];
  if (geoname.alternate_name && geoname.is_historic) {
    parts.push(geoname.name);
    parts.push(` (formerly ${geoname.alternate_name})`);
  } else if (geoname.alternate_name) {
    parts.push(geoname.alternate_name);
    parts.push(` (${geoname.name})`);
  } else parts.push(geoname.name);
  if (geoname.subregion_name) {
    parts.push(`, ${geoname.subregion_name}`);
  }
  if (geoname.region_name) {
    parts.push(`, ${geoname.region_name}`);
  }
  return parts.join('');
}
