import {post} from 'utils/request';


export function create_organization(data:any) {
  return post('/auth/web/login', {data});
}
