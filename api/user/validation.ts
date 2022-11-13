import Joi from 'joi';
import {
  rxNoSpecialCharactersMultiWords,
  rxNotMobileNumber,
  usernamePattern,
} from 'utils/regex';
import enums from '@socious/data';

export const schemaProfileUpdate = Joi.object({
  userType: Joi.string().valid('organizations', 'users').required(),
  // User Only
  firstName: Joi.string().when('userType', {
    is: 'users',
    then: Joi.string()
      .label('FirstName')
      .required()
      .regex(rxNoSpecialCharactersMultiWords)
      .messages({
        'string.empty': `Please enter a first name.`,
        'string.pattern.base': `Should not contain special characters.`,
        'any.required': `Please enter a first name.`,
      }),
    otherwise: Joi.string().allow('', null),
  }),
  lastName: Joi.string().when('userType', {
    is: 'users',
    then: Joi.string()
      .required()
      .label('LastName')
      .regex(rxNoSpecialCharactersMultiWords)
      .messages({
        'string.empty': `Please enter a last name.`,
        'string.pattern.base': `Should not contain special characters.`,
        'any.required': `Please enter a last name.`,
      }),
    otherwise: Joi.string().allow('', null),
  }),
  userName: Joi.string().when('userType', {
    is: 'users',
    then: Joi.string()
      .required()
      .label('Username')
      .regex(usernamePattern)
      .messages({
        'string.empty': `Please enter a username.`,
        'string.pattern.base': `Username is not valid.`,
        'any.required': `Please enter a username.`,
      }),
    otherwise: Joi.string().allow('', null),
  }),
  skills: Joi.array().when('userType', {
    is: 'users',
    then: Joi.array().items(Joi.string()).min(1).max(10).required().messages({
      'array.max': `Please select only {#limit} skills.`,
      'array.min': `Please select {#limit} skills`,
      'array.empty': `Please select {#limit} skills`,
    }),
    otherwise: Joi.array().allow('', null),
  }),
  // Organization only
  name: Joi.when('userType', {
    is: 'organizations',
    then: Joi.string()
      .trim()
      .required()
      .label('Organization name')
      .required()
      .messages({
        'string.empty': `Please enter a name.`,
        'string.base': `Please enter a name.`,
        'any.required': `Please enter a name.`,
      }),
    otherwise: Joi.string().allow('', null),
  }),
  email: Joi.when('userType', {
    is: 'organizations',
    then: Joi.string()
      .trim()
      .required()
      .label('Organization email')
      .required()
      .messages({
        'string.base': `Please enter org email.`,
        'string.empty': `Please enter org email.`,
        'any.required': `Please enter org email.`,
      }),
    otherwise: Joi.string().allow('', null),
  }),
  type: Joi.when('userType', {
    is: 'organizations',
    then: Joi.string()
      .required()
      .label('Organization type')
      .valid(...Object.values(enums.OrganizationType))
      .messages({
        'string.empty': `Please enter a name.`,
        'string.pattern.base': `Name is not valid.`,
        'any.required': `Please enter a name.`,
      }),
    otherwise: Joi.string().allow('', null),
  }),
  culture: Joi.string().trim().label('Culture').allow('', null).messages({
    'string.base': `Please tell us about your culture.`,
    'string.empty': `Please tell us about your culture.`,
  }),
  website: Joi.string().uri().allow('', null).messages({
    'string.empty': `Please enter org website.`,
    'any.required': `Please enter org website.`,
    'string.uri': `Please enter a valid url.`,
  }),
  // For Both
  address: Joi.string().allow(null, '').label('Address').messages({
    'string.base': `Address should be a string.`,
  }),
  passions: Joi.array().items(Joi.string()).min(1).max(5).required().messages({
    'array.max': `Please select only {#limit} causes.`,
    'array.min': `Please select {#limit} causes`,
    'array.empty': `Please select {#limit} causes`,
  }),

  country: Joi.string().label('Country').messages({
    'any.required': `Please select a country`,
    'string.base': `Please select a country`,
    'string.empty': `Please select a country`,
  }),
  city: Joi.string().label('City').messages({
    'any.required': `Please select a city`,
    'string.base': `Please select a city.`,
    'string.empty': `Please select a city.`,
  }),
  geoname_id: Joi.number().empty(null),
  countryNumber: Joi.string().allow(null, '').label('countryNumber'),
  phoneNumber: Joi.string()
    .allow(null, '')
    .regex(rxNotMobileNumber)
    .label('phoneNumber')
    .messages({
      'string.pattern.base': `Phone number must be within 3-15 digits.`,
    }),
  bio: Joi.string().trim().max(160).required().label('Bio').messages({
    'any.required': `Please enter a bio.`,
    'string.base': `Please enter a bio.`,
    'string.empty': `Please enter a bio.`,
    'string.max': `Please enter 160 characters or below.`,
  }),
  mission: Joi.string().trim().allow('', null).label('Mission').messages({
    'any.required': `Please tell us about your mission.`,
    'string.base': `Please tell us about your mission.`,
    'string.empty': `Please tell us about your mission.`,
  }),
});
