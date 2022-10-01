import {post} from 'utils/request';

export function followUser(userId: string) {
  return post(`/follows/${userId}`, {});
}

export function unfollowUser(userId: string) {
  return post(`/follows/${userId}/unfollow`);
}
