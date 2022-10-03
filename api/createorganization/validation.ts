import Joi, {allow} from 'joi';
import enums from '@socious/data';
import {rxNotMobileNumber} from 'utils/regex';

export const schemaCreateOrganization = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': `Name is required`,
    'string.base': `Name is required.`,
  }),
  bio: Joi.string().required().messages({
    'string.empty': `Bio is required.`,
    'string.base': `Bio is required.`,
  }),
  website: Joi.string().uri().allow(null, ''),
  description: Joi.string().allow(null, ''),
  mission: Joi.string().allow(null, ''),
  culture: Joi.string().allow(null, ''),
  email: Joi.string()
    .email({tlds: {allow: false}})
    .messages({
      'string.base': `Email should be a type of 'text'`,
      'string.empty': `Email cannot be an empty field`,
      'any.required': `Email is a required field`,
      'string.email': `Email must be a valid email`,
    }),
  country: Joi.string().required().messages({
    'any.required': `cannot be an empty field`,
  }),
  city: Joi.string().required().messages({
    'any.required': `cannot be an empty field`,
  }),
  address: Joi.string().allow(null, ''),
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
