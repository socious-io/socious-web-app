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
const getProjectLength = (k: string) => {
  switch (k) {
    case 'LESS_THAN_A_DAY':
      return 'Less than a day';
    case 'LESS_THAN_A_MONTH':
      return 'Less than a month';
    case '1_3_MONTHS':
      return '1-3 months';
    case '3_6_MONTHS':
      return '3-6 months';
    default:
      return 'More than 6 months';
  }
};

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
    name: getProjectLength(id),
    //  getText('en', `PROJECT.${id?.[0]}`),
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
