import {Experience} from '@models/experiences';
import {post} from 'utils/request';

export function addExperience(payload: Experience) {
  return post(`/user/experiences`, payload);
}
