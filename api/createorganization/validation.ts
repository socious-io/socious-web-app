import Joi, {allow} from 'joi';
import enums from '@socious/data';
import {rxNotMobileNumber} from 'utils/regex';

export const schemaCreateOrganization = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': `Name is required`,
    'string.base': `Name is required.`,
  }),
  bio: Joi.string().trim().max(160).required().messages({
    'string.empty': `Bio is required.`,
    'string.base': `Bio is required.`,
  }),
  website: Joi.string().uri().allow(null, ''),
  description: Joi.string().trim().allow(null, ''),
  mission: Joi.string().trim().allow(null, ''),
  culture: Joi.string().trim().allow(null, ''),
  email: Joi.string()
    .email({tlds: {allow: false}})
    .messages({
      'string.base': `Email should be a type of 'text'`,
      'string.empty': `Email cannot be an empty field`,
      'any.required': `Email is a required field`,
      'string.email': `Email must be a valid email`,
    }),
  country: Joi.string().messages({
    'any.required': `cannot be an empty field`,
  }),
  city: Joi.string().messages({
    'any.required': `cannot be an empty field`,
  }),
  geoname_id: Joi.number().empty(null),
  address: Joi.string().trim().allow(null, ''),
  type: Joi.string().valid(...Object.values(enums.OrganizationType)),
  social_causes: Joi.array().items(
    Joi.string().valid(...Object.values(enums.SocialCauses)),
  ),
  phone: Joi.string().allow(null, '').regex(rxNotMobileNumber).messages({
    'any.required': `Phone number cannot be an empty field.`,
    'string.pattern.base': `Phone number must be within 3-15 digits.`,
  }),
  mobile_country_code: Joi.string()
    .regex(/^\+[0-9 -]+/)
    .allow(null, '')
    .messages({
      'any.required': `cannot be an empty field`,
    }),
});
