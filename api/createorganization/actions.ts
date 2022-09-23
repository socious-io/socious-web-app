import {post} from 'utils/request';

export function create_organization(data: any) {
  return post('/orgs', {
    name: data.name,
    bio: data.bio,
    email: data.email,
    phone: data.phone,
    type: data.type,
    city: data.city,
    address: data.address,
    social_causes: data.social_causes,
  });
}
