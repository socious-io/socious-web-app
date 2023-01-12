import {post} from 'utils/request';

export function reportUser(userId: string) {
  return post(`/user/${userId}/report`, {
    comment: 'WebappV1 empty comment',
    blocked: false,
  });
}

export function blockUser(userId: string) {
  return post(`/user/${userId}/report`, {
    comment: 'WebappV1 empty comment',
    blocked: true,
  });
}
