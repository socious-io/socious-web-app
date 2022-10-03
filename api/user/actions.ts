import {UpdateProfileBodyType} from '@models/profile';
import {post} from 'utils/request';

export function updateProfile(profileBody: UpdateProfileBodyType) {
  return post('/user/update/profile', profileBody);
}
