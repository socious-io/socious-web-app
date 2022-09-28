import {post} from 'utils/request';

// interfaces
import {CreateOrganizationType} from '@models/createOrganization';

export function create_organization(data: any) {
  //destructure data
  const {
    type,
    social_causes,
    name,
    bio,
    email,
    country,
    city,
    phone,
    mission,
    description,
    culture,
    mobile_country_code,
    address,
    website,
  } = data;

  // create post body (required data)
  const postBody: CreateOrganizationType = {
    type: type,
    social_causes: social_causes,
    name: name,
    bio: bio,
    email: email,
    country: country,
    city: city,
  };

  //post body for not empty not required data
  if (phone) postBody.phone = phone;
  // if (mission) postBody.mission = mission;
  if (description) postBody.description = description;
  //  if (culture) postBody.culture = culture;
  if (mobile_country_code) postBody.mobile_country_code = mobile_country_code;
  if (address) postBody.address = address;
  if (website) postBody.website = website;

  console.log('postbody', postBody);
  return post('/orgs', postBody);
}
