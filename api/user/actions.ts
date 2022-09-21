import {post} from 'utils/request';

export function updateProfile(userBody: any) {
  return post('/user/profile', userBody);
}
