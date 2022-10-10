import {SimplifiedUserProfile} from '@models/profile';
import useSWR from 'swr';
import {get} from 'utils/request';

export const useUserProfile = (id: string) => {
  return useSWR<SimplifiedUserProfile>(`/user/${id}/profile`, (url) =>
    get(url),
  );
};
