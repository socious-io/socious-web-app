//https://dev.socious.io/api/v2/identities/:id/session

import {get} from 'utils/request';

export function changeIdentity(identityId: string) {
  return get(`/api/v2/identities/set/${identityId}/session`);
}
