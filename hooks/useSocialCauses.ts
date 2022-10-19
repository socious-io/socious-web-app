//get social causes constant data
import Data, {getText} from '@socious/data';
import {useMemo} from 'react';

const passionData = Object.keys(Data.SocialCauses);

export const useSocialCauses = () => {
  return useMemo(
    () => {
      const sorted = passionData.map((id) => ({
        id,
        name: getText('en', `PASSION.${id}`),
      }));
      sorted.sort((a, b) => (a.name > b.name ? 1 : -1));
      return sorted;
    },
    [
      // todo: language
    ],
  );
};
