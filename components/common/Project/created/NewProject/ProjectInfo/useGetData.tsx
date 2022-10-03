import Data, {getText} from '@socious/data';
import {useMemo} from 'react';

const projectRemotePreferenceType = Object.keys(
  Data.ProjectRemotePreferenceType,
);
const projectPaymentSchemeType = Object.keys(Data.ProjectPaymentSchemeType);
const projectPaymentType = Object.keys(Data.ProjectPaymentType);
const projectStatusType = Object.keys(Data.ProjectStatusType);
const projectType = Object.keys(Data.ProjectType);
const projectLengthType = Object.keys(Data.ProjectLengthType);
const passionData = Object.keys(Data.SocialCauses);

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
      id,
      name: getText('en', `PROJECT.${id}`),
    }));
    const passionDataItems = passionData.map((id) => ({
      id,
      name: getText('en', `PASSION.${id}`),
    }));
    passionDataItems.sort((a, b) => (a.name > b.name ? 1 : -1));

    return {
      projectPaymentTypeItems,
      projectStatusItems,
      projectRemotePreferenceItems,
      projectPaymentSchemeItems,
      projectItems,
      projectLengthItems,
      passionDataItems,
    };
  }, []);

  return {items};
};

export default useGetData;
