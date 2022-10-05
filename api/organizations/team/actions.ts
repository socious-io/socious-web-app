import {post} from 'utils/request';

export function addMember(identityId: string, userId: string) {
  return post(`/orgs/${identityId}/members/${userId}`);
}
