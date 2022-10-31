import Data, {getText} from '@socious/data';
import {useMemo} from 'react';
import {getAllISOCodes} from 'iso-country-currency';
import {EXPERIENCE_LEVEL_OPTIONS} from '@components/common/Search/filterOptions';

const projectRemotePreferenceType = Object.keys(
  Data.ProjectRemotePreferenceType,
);
const projectPaymentSchemeType = Object.keys(Data.ProjectPaymentSchemeType);
const projectPaymentType = Object.keys(Data.ProjectPaymentType);
const projectStatusType = Object.keys(Data.ProjectStatusType);
const projectType = Object.keys(Data.ProjectType);
const projectLengthType = Object.entries(Data.ProjectLengthType);
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
    case '6_MONTHS_OR_MORE':
      return 'More than 6 months';
  }
};

const useGetData = () => {
  const items = useMemo(() => {
    const projectPaymentTypeItems = projectPaymentType.map((id) => ({
      id,
      name: getText('en', `PAYMENT.${id}`),
    }));
    const projectStatusItems = projectStatusType.map((id) => ({
      id,
      name: getText('en', `PROJECT.${id}`),
    }));
    const projectPaymentSchemeItems = projectPaymentSchemeType.map((id) => ({
      id,
      name: getText('en', `PAYMENT.${id}`),
    }));
    const projectRemotePreferenceItems = projectRemotePreferenceType.map(
      (id) => ({
        id,
        name: getText('en', `PROJECT.${id}`),
      }),
    );
    const projectItems = projectType.map((id) => ({
      id,
      name: getText('en', `PROJECT.${id}`),
    }));
    const projectLengthItems = projectLengthType.map((id) => ({
      id: id?.[1],
      name: getProjectLength(id?.[1] as string),
      //  getText('en', `PROJECT.${id?.[0]}`),
    }));

    const passionDataItems = passionData.map((id) => ({
      id,
      name: getText('en', `PASSION.${id}`),
    }));
    passionDataItems.sort((a, b) => (a.name > b.name ? 1 : -1));

    const data = getAllISOCodes();
    const countries = data?.map((d) => ({
      name: d?.countryName,
      id: d?.iso,
    }));
    const currency = data?.map((d) => d.currency);
    const filteredCurrencies = currency.filter((c, index) => {
      return currency.indexOf(c) === index;
    });
    const allCurrencies = filteredCurrencies?.map((m) => ({
      name: m,
      id: m,
    }));

    const experienceLevelOptions = EXPERIENCE_LEVEL_OPTIONS.map(
      ({value, label: name}, index) => ({id: index, name}),
    );

    return {
      projectPaymentTypeItems,
      projectStatusItems,
      projectRemotePreferenceItems,
      projectPaymentSchemeItems,
      projectItems,
      projectLengthItems,
      passionDataItems,
      countries: [{name: 'Worldwide', id: 'XW'}, ...countries],
      allCurrencies,
      experienceLevelOptions,
    };
  }, []);

  return {items};
};

export default useGetData;
