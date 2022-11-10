import {IOrganization} from '@models/organization';
import {IUpdateOrgBody} from '@models/profile';
import {get, post} from 'utils/request';

export function getOrganization(identityId: string) {
  return get(`/orgs/${identityId}`);
}

export function updateOrganization(orgId: string, orgBody: IUpdateOrgBody) {
  return post<IOrganization>(`/orgs/update/${orgId}`, orgBody);
}

export function removeMember(orgId: string, userId: string) {
  return post(`/orgs/remove/${orgId}/members/${userId}`);
}
