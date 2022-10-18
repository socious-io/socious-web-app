import {IOrganization} from '@models/organization';
import useSWR from 'swr';
import {get} from 'utils/request';

export const useOrganization = (id: string) => {
  return useSWR<IOrganization>(`/orgs/${id}`, (url) => get(url));
};
