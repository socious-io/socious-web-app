import Joi from 'joi';
import {
  rxNoSpecialCharactersMultiWords,
  rxNotMobileNumber,
  usernamePattern,
} from 'utils/regex';

export const schemaProfileUpdate = Joi.object({
  firstName: Joi.string()
    .required()
    .label('FirstName')
    .regex(rxNoSpecialCharactersMultiWords)
    .messages({
      'string.empty': `Please enter a first name.`,
      'string.pattern.base': `Should not contain special characters.`,
      'any.required': `Please enter a first name.`,
    }),
  lastName: Joi.string()
    .required()
    .label('LastName')
    .regex(rxNoSpecialCharactersMultiWords)
    .messages({
      'string.empty': `Please enter a last name.`,
      'string.pattern.base': `Should not contain special characters.`,
      'any.required': `Please enter a last name.`,
    }),
  userName: Joi.string()
    .required()
    .label('Username')
    .regex(usernamePattern)
    .messages({
      'string.empty': `Please enter a username.`,
      'string.pattern.base': `Username is not valid.`,
      'any.required': `Please enter a username.`,
    }),
  address: Joi.string().allow(null, '').label('Address').messages({
    'string.base': `Address should be a string.`,
  }),
  passions: Joi.array().items(Joi.string()).min(1).max(5).required().messages({
    'array.max': `Please select only {#limit} causes.`,
    'array.min': `Please select {#limit} causes`,
    'array.empty': `Please select {#limit} causes`,
  }),
  skills: Joi.array().items(Joi.string()).min(1).max(10).required().messages({
    'array.max': `Please select only {#limit} skills.`,
    'array.min': `Please select {#limit} skills`,
    'array.empty': `Please select {#limit} skills`,
  }),
  country: Joi.string().required().label('Country').messages({
    'any.required': `Please select a country`,
    'string.base': `Please select a country`,
    'string.empty': `Please select a country`,
  }),
  city: Joi.string().required().label('City').messages({
    'any.required': `Please select a city`,
    'string.base': `Please select a city.`,
    'string.empty': `Please select a city.`,
  }),
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
  }),
  mission: Joi.string().trim().label('Mission').messages({
    'any.required': `Please tell us about your mission.`,
    'string.base': `Please tell us about your mission.`,
    'string.empty': `Please tell us about your mission.`,
  }),
});
