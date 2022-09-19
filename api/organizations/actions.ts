import {get} from 'utils/request';

export function getOrganization(identityId: string) {
  return get(`/orgs/${identityId}`);
}
