import {getAllISOCodes} from 'iso-country-currency';

import {ComboBoxSelectionType} from '@components/common';

export const countryISOtoName = new Map<string, string>();
export const countryNameToISO = new Map<string, string>();
export const countryOptions: Array<ComboBoxSelectionType> = [];

for (const iso of getAllISOCodes()) {
  countryISOtoName.set(iso.iso, iso.countryName);
  countryNameToISO.set(iso.countryName, iso.iso);
  countryOptions.push({
    id: iso.iso,
    name: iso.countryName,
  });
}
