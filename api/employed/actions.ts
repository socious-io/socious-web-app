import {post} from 'utils/request';

export function completeAssignment(employedId: string) {
  return post(`/employed/${employedId}/complete`, {});
}

export function stopAssignment(employedId: string) {
  return post(`/employed/${employedId}/cancel`);
}
