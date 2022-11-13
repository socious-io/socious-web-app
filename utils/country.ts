import {getAllISOCodes} from 'iso-country-currency';

export const countryISOtoName = new Map<string, string>();
export const countryNameToISO = new Map<string, string>();

for (const iso of getAllISOCodes()) {
  countryISOtoName.set(iso.iso, iso.countryName);
  countryNameToISO.set(iso.countryName, iso.iso);
}
