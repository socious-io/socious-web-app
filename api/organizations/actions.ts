import {IUpdateOrgBody} from '@models/profile';
import {get, post} from 'utils/request';

export function getOrganization(identityId: string) {
  return get(`/orgs/${identityId}`);
}

export function updateOrganization(orgId: string, orgBody: IUpdateOrgBody) {
  return post(`/orgs/update/${orgId}`, orgBody);
}
