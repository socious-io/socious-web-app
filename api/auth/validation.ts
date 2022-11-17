import Joi from 'joi';

import {
  rxNotMobileNumber,
  rxNoSpecialCharacters,
  rxNoSpecialCharactersMultiWords,
  rxHasUpperLower,
  rxHasNumber,
} from 'utils/regex';

export const schemaChangePassword = Joi.object({
  currentPassword: Joi.string().min(8).required().messages({
    'string.base': `Password should be a type of 'text'`,
    'string.empty': `Password cannot be an empty field`,
    'string.min': `Password should have a minimum length of {#limit}`,
    'any.required': `Password is a required field`,
  }),
  newPassword: Joi.string()
    .min(8)
    .required()
    .regex(rxHasUpperLower)
    .regex(rxHasNumber)
    .messages({
      'string.base': `Password should be a type of 'text'`,
      'string.empty': `Password cannot be an empty field`,
      'string.min': `Password should have a minimum length of {#limit}`,
      'any.required': `Password is a required field`,
      'string.pattern.base': `Password is not strong enough`,
    }),
  confirmNewPassword: Joi.string()
    .min(8)
    .valid(Joi.ref('newPassword '))
    .required()
    .messages({
      'any.only': 'The passwords you entered do not match.',
      'string.base': `Confirm password should be a type of 'text'`,
      'string.empty': `Confirm password cannot be an empty field`,
      'any.required': `Confirm password is a required field`,
    }),
});

export const schemaForgotPasswordStep1 = Joi.object({
  email: Joi.string()
    .email({tlds: {allow: false}})
    .required()
    .messages({
      'string.base': `Email should be a type of 'text'`,
      'string.empty': `Email cannot be an empty field`,
      'any.required': `Email is a required field`,
      'string.email': `Email must be a valid email`,
    }),
});

export const schemaForgotPasswordStep3 = Joi.object({
  newPassword: Joi.string()
    .min(8)
    .required()
    .regex(rxHasUpperLower)
    .regex(rxHasNumber)
    .messages({
      'string.base': `Password should be a type of 'text'`,
      'string.empty': `Password cannot be an empty field`,
      'string.min': `Password should have a minimum length of {#limit}`,
      'any.required': `Password is a required field`,
      'string.pattern.base': `Password is not strong enough`,
    }),
  confirmNewPassword: Joi.string()
    .min(8)
    .valid(Joi.ref('newPassword '))
    .required()
    .messages({
      'any.only': 'The passwords you entered do not match.',
      'string.base': `Confirm password should be a type of 'text'`,
      'string.empty': `Confirm password cannot be an empty field`,
      'any.required': `Confirm password is a required field`,
    }),
});

export const schemaLogin = Joi.object({
  email: Joi.string()
    .email({tlds: {allow: false}})
    .required()
    .messages({
      'string.base': `Email should be a type of 'text'`,
      'string.empty': `Email cannot be an empty field`,
      'any.required': `Email is a required field`,
      'string.email': `Email must be a valid email`,
    }),
  password: Joi.string().min(8).required().messages({
    'string.base': `Password should be a type of 'text'`,
    'string.empty': `Password cannot be an empty field`,
    'string.min': `Password should have a minimum length of {#limit}`,
    'any.required': `Password is a required field`,
  }),
});

export const schemaOnboardingStep2 = Joi.object({
  passions: Joi.array().items(Joi.string()).min(1).max(5).required().messages({
    'array.max': `Please select only {#limit} causes.`,
    'array.min': `Please select {#limit} causes`,
    'array.empty': `Please select {#limit} causes`,
  }),
});

export const schemaOnboardingStep3 = Joi.object({
  skills: Joi.array().items(Joi.string()).min(1).max(10).required().messages({
    'array.max': `Please select only {#limit} skills.`,
    'array.min': `Please select {#limit} skills`,
    'array.empty': `Please select {#limit} skills`,
  }),
});

export const schemaOnboardingStep4 = Joi.object({
  country: Joi.required().label('Country').messages({
    'any.required': `cannot be an empty field`,
  }),
  city: Joi.required().label('City').messages({
    'any.required': `cannot be an empty field`,
  }),
  geoname_id: Joi.number().empty(null),
});
export const schemaOnboardingStep5 = Joi.object({
  availableProject: Joi.required().label('availableProject').messages({
    'any.required': `cannot be an empty field`,
  }),
});
export const schemaOnboardingStep6 = Joi.object({
  countryNumber: Joi.required().label('countryNumber').messages({
    'any.required': `cannot be an empty field`,
  }),
  phoneNumber: Joi.string()
    .required()
    .regex(rxNotMobileNumber)
    .label('phoneNumber')
    .messages({
      'string.empty': `Phone number cannot be an empty field.`,
      'string.required': `Phone number cannot be an empty field.`,
      'string.pattern.base': `Phone number must be within 3-15 digits.`,
    }),
});
export const schemaOnboardingStep7 = Joi.object({
  bio: Joi.string().trim().max(160).required().label('Bio').messages({
    'any.required': `cannot be an empty field`,
    'string.max': `Please enter 160 characters or below.`,
  }),
});

export const schemaSignupStep1 = Joi.object({
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
      'any.required': `Last name cannot be an empty field.`,
    }),
});
export const schemaSignupStep2 = Joi.object({
  email: Joi.string()
    .email({tlds: {allow: false}})
    .required()
    .messages({
      'string.base': `Email should be a type of 'text'.`,
      'string.empty': `Email cannot be an empty field.`,
      'any.required': `Email is a required field.`,
      'string.email': `Email address is not valid.`,
    }),
});
export const schemaSignupStep3 = Joi.object({
  password: Joi.string()
    .min(8)
    .required()
    .regex(rxHasUpperLower)
    .regex(rxHasNumber)
    .messages({
      'string.base': `Password should be a type of 'text'`,
      'string.empty': `Password cannot be an empty field`,
      'string.min': `Password should have a minimum length of {#limit}`,
      'any.required': `Password is a required field`,
      'string.pattern.base': `Password is not strong enough`,
    }),
  confirmPassword: Joi.string()
    .min(8)
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'The passwords you entered do not match.',
      'string.base': `Confirm password should be a type of 'text'`,
      'string.empty': `Confirm password cannot be an empty field`,
      'any.required': `Confirm password is a required field`,
    }),
});

export const schemaSignupCompact = Joi.object({
  username: Joi.string(),
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
      'any.required': `Last name cannot be an empty field.`,
    }),
  password: Joi.string()
    .min(8)
    .required()
    .regex(rxHasUpperLower)
    .regex(rxHasNumber)
    .messages({
      'string.base': `Password should be a type of 'text'`,
      'string.empty': `Password cannot be an empty field`,
      'string.min': `Password should have a minimum length of {#limit}`,
      'any.required': `Password is a required field`,
      'string.pattern.base': `Password is not strong enough`,
    }),
});
