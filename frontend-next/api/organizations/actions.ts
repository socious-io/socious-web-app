import {get} from 'utils/request';

export function getOrganization(identityId: string) {
  return get(`/api/v2/orgs/${identityId}`);
}
