import {get} from 'utils/request';

export function getUserProjects() {
  return get(`/user/applicants`);
}