import {
  GlobalResponseType,
  IOrganizationFollowerType,
  IOrganizationUserType,
} from '@models/organization';
import {get, post} from 'utils/request';

export function getOrganizationMembers(identityId: string) {
  return get<GlobalResponseType<IOrganizationUserType>>(
    `/orgs/${identityId}/members`,
  );
}

export function getFollowers() {
  return get<GlobalResponseType<IOrganizationFollowerType>>(
    `/follows/followers`,
  );
}

export function addMember(identityId: string, userId: string) {
  return post(`/orgs/${identityId}/members/${userId}`);
}
