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
      'string.empty': `First name cannot be an empty field.`,
      'string.pattern.base': `Should not contain special characters.`,
      'any.required': `First name cannot be an empty field.`,
    }),
  lastName: Joi.string()
    .required()
    .label('LastName')
    .regex(rxNoSpecialCharactersMultiWords)
    .messages({
      'string.empty': `Last name cannot be an empty field`,
      'string.pattern.base': `Should not contain special characters.`,
    }),
  userName: Joi.string()
    .required()
    .label('Username')
    .regex(usernamePattern)
    .messages({
      'string.empty': `Username cannot be an empty field`,
      'string.pattern.base': `Pattern doesn't match.`,
    }),
  address: Joi.string().allow(null, '').label('Address').messages({
    'string.base': `Address should be text.`,
  }),
  email: Joi.string()
    .email({tlds: {allow: false}})
    .required()
    .messages({
      'string.base': `Email should be a type of 'text'.`,
      'string.empty': `Email cannot be an empty field.`,
      'any.required': `Email is a required field.`,
      'string.email': `Email address is not valid.`,
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
    'any.required': `cannot be an empty field`,
    'string.base': `Email should be a type of 'text'.`,
    'string.empty': `Email cannot be an empty field.`,
  }),
  city: Joi.string().required().label('City').messages({
    'any.required': `cannot be an empty field`,
    'string.base': `Email should be a type of 'text'.`,
    'string.empty': `Email cannot be an empty field.`,
  }),
  countryNumber: Joi.string().allow(null, '').label('countryNumber').messages({
    'any.required': `cannot be an empty field`,
  }),
  phoneNumber: Joi.string()
    .allow(null, '')
    .regex(rxNotMobileNumber)
    .label('phoneNumber')
    .messages({
      'string.empty': `Phone number cannot be an empty field.`,
      'string.required': `Phone number cannot be an empty field.`,
      'string.pattern.base': `Phone number must be within 3-15 digits.`,
    }),
  bio: Joi.string().max(160).required().label('Bio').messages({
    'any.required': `cannot be an empty field`,
  }),
});
