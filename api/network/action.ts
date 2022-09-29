import {post,get} from 'utils/request';

export function followUser(userId: string) {
  return post(`/follows/${userId}`);
}

