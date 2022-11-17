import Data, {getText} from '@socious/data';
import {getAllISOCodes} from 'iso-country-currency';
import {EXPERIENCE_LEVEL_OPTIONS} from '@components/common/Search/filterOptions';
import {countryOptionsWithXW} from './geo';
import {ComboBoxSelectionType} from '@components/common';

const projectRemotePreferenceType = Object.keys(
  Data.ProjectRemotePreferenceType,
);
const projectPaymentSchemeType = Object.keys(Data.ProjectPaymentSchemeType);
const projectPaymentType = Object.keys(Data.ProjectPaymentType);
const projectStatusType = Object.keys(Data.ProjectStatusType);
const projectType = Object.keys(Data.ProjectType);
const projectLengthType = Object.keys(Data.ProjectLengthType);
const passionData = Object.keys(Data.SocialCauses);

export const projectPaymentTypeItems: Array<ComboBoxSelectionType> =
  projectPaymentType.map((id) => ({
    id,
    name: getText('en', `PAYMENT.${id}`),
  }));
export const projectStatusItems: Array<ComboBoxSelectionType> =
  projectStatusType.map((id) => ({
    id,
    name: getText('en', `PROJECT.${id}`),
  }));
export const projectPaymentSchemeItems: Array<ComboBoxSelectionType> =
  projectPaymentSchemeType.map((id) => ({
    id,
    name: getText('en', `PAYMENT.${id}`),
  }));
export const projectRemotePreferenceItems: Array<ComboBoxSelectionType> =
  projectRemotePreferenceType.map((id) => ({
    id,
    name: getText('en', `PROJECT.${id}`),
  }));
export const projectItems: Array<ComboBoxSelectionType> = projectType.map(
  (id) => ({
    id,
    name: getText('en', `PROJECT.${id}`),
  }),
);
export const projectLengthItems: Array<ComboBoxSelectionType> =
  projectLengthType.map((id: string) => ({
    id: id,
    name: getText('en', `PROJECT.${Data.ProjectLengthType[id]}`),
  }));

export const passionDataItems: Array<ComboBoxSelectionType> = passionData.map(
  (id) => ({
    id,
    name: getText('en', `PASSION.${id}`),
  }),
);
passionDataItems.sort((a, b) => (a.name > b.name ? 1 : -1));

const currencies = new Set(getAllISOCodes().map((d) => d.currency));
export const currencyOptions: Array<ComboBoxSelectionType> = Array.from(
  currencies,
).map((m) => ({
  name: m,
  id: m,
}));

export const experienceLevelOptions: Array<{id: number; name: string}> =
  EXPERIENCE_LEVEL_OPTIONS.map(({value, label: name}, index) => ({
    id: index,
    name,
  }));

const items = {
  projectPaymentTypeItems,
  projectStatusItems,
  projectRemotePreferenceItems,
  projectPaymentSchemeItems,
  projectItems,
  projectLengthItems,
  passionDataItems,
  countries: countryOptionsWithXW,
  allCurrencies: currencyOptions,
  experienceLevelOptions,
};
