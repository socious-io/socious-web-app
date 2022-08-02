import {FormChangePasswordType} from '@models/changePassword';
import {FormResetPasswordType, SendEmailType} from '@models/forgotPassword';
import {FormLoginType} from '@models/login';
import {UserProfileBody} from '@models/profile';
import {
  RegisterFormStep1Type,
  RegisterFormStep2Type,
  RegisterFormStep3Type,
  RegisterFormType,
} from '@models/register';

import * as yup from 'yup';
import Joi from 'joi';

import {
  ADDRESS_LENGTH,
  BIO_LENGTH,
  CITY_LENGTH,
  COMPANY_NAME_LENGTH,
  CULTURE_LENGTH,
  EMAIL_LENGTH,
  FIRST_NAME_LENGTH,
  LAST_NAME_LENGTH,
  MISSION_LENGTH,
  NEW_PASSWORD_MAX_LENGTH,
  PHONE_NUMBER_LENGTH,
  WEBSITE_LENGTH,
} from './maxLengthField';
import {
  rxEmail,
  rxEmailDoubleSpec,
  rxFirstLastName,
  rxHasNumber,
  rxNotMobileNumber,
} from './regex';

export const loginValidate: yup.SchemaOf<FormLoginType> = yup.object().shape({
  email: yup
    .string()
    .required('msg:txEmailRequired')
    .max(EMAIL_LENGTH, 'msg:txEmailMaxLength')
    .trim()
    .test('checkEmail', 'msg:txEmailInvalid', (value) => {
      if (typeof value !== 'string') {
        return true;
      } else {
        return !rxEmailDoubleSpec.test(value) && rxEmail.test(value);
      }
    }),
  password: yup.string().required('msg:txPasswordRequired'),
  token_device: yup.string(),
});

export const registerStep1Validate: yup.SchemaOf<RegisterFormStep1Type> = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .trim()
      .required('msg:txFirstNameRequired')
      .max(FIRST_NAME_LENGTH, 'msg:txFirstNameMaxLength')
      .matches(rxFirstLastName, 'msg:txFirstNameSpecialCharacters'),
    lastName: yup
      .string()
      .trim()
      .required('msg:txLastNameRequired')
      .max(LAST_NAME_LENGTH, 'msg:txLastNameMaxLength')
      .matches(rxFirstLastName, 'msg:txLastNameSpecialCharacters'),
  });

export const registerStep2Validate: yup.SchemaOf<RegisterFormStep2Type> = yup
  .object()
  .shape({
    email: yup
      .string()
      .required('msg:txEmailRequired')
      .max(EMAIL_LENGTH, 'msg:txEmailMaxLength')
      .trim()
      .test('checkEmail', 'msg:txEmailInvalid', (value) => {
        if (typeof value !== 'string') {
          return true;
        } else {
          return !rxEmailDoubleSpec.test(value) && rxEmail.test(value);
        }
      }),
  });

export const registerStep3Validate: yup.SchemaOf<RegisterFormStep3Type> = yup
  .object()
  .shape({
    password: yup
      .string()
      .required('msg:txPasswordRequired')
      .max(NEW_PASSWORD_MAX_LENGTH, 'msg:txNewPasswordMaxLength')
      .min(7, 'msg:txPasswordIncorrect')
      .matches(rxHasNumber, 'msg:txPasswordIncorrect')
      .test('passwordSpace', 'msg:txPasswordHasSpace', (value) => {
        if (value && value.split(' ').length > 1) {
          return false;
        }
        return true;
      }),
    confirmPassword: yup
      .string()
      .required('msg:txConfirmPasswordRequired')
      .oneOf(
        [undefined, '', yup.ref('password')],
        'msg:txConfirmPasswordNotMatch',
      ),
  });
// export const registerUserValidate: yup.SchemaOf<RegisterFormType> = yup.object().shape({
//     firstName: yup
//         .string()
//         .trim()
//         .required('msg:txFirstNameRequired')
//         .max(FIRST_NAME_LENGTH, 'msg:txFirstNameMaxLength')
//         .matches(rxFirstLastName, 'msg:txFirstNameSpecialCharacters'),
//     lastName: yup
//         .string()
//         .trim()
//         .required('msg:txLastNameRequired')
//         .max(LAST_NAME_LENGTH, 'msg:txLastNameMaxLength')
//         .matches(rxFirstLastName, 'msg:txLastNameSpecialCharacters'),
//     email: yup
//         .string()
//         .required('msg:txEmailRequired')
//         .max(EMAIL_LENGTH, 'msg:txEmailMaxLength')
//         .test('checkEmail', 'msg:txEmailInvalid', (value) => {
//             if (typeof value !== 'string') {
//                 return true;
//             } else {
//                 return !rxEmailDoubleSpec.test(value) && rxEmail.test(value);
//             }
//         }),
//     password: yup
//         .string()
//         .required('msg:txPasswordRequired')
//         .max(NEW_PASSWORD_MAX_LENGTH, 'msg:txNewPasswordMaxLength')
//         .min(7, 'msg:txPasswordIncorrect')
//         .matches(rxHasNumber, 'msg:txPasswordIncorrect')
//         .test('passwordSpace', 'msg:txPasswordHasSpace', (value) => {
//             if (value && value.split(' ').length > 1) {
//                 return false;
//             }
//             return true;
//         }),
//     confirmPassword: yup
//         .string()
//         .required('msg:txConfirmPasswordRequired')
//         .oneOf([undefined, '', yup.ref('password')], 'msg:txConfirmPasswordNotMatch'),
//     token_device: yup.string(),
// });

// export const updateUserValidate: yup.SchemaOf<UserProfileBody> = yup.object().shape({
//     first_name: yup
//         .string()
//         .required('msg:txFirstNameRequired')
//         .trim()
//         .max(FIRST_NAME_LENGTH, 'msg:txFirstNameMaxLength')
//         .matches(rxFirstLastName, 'msg:txFirstNameSpecialCharacters'),
//     last_name: yup
//         .string()
//         .required('msg:txLastNameRequired')
//         .trim()
//         .max(LAST_NAME_LENGTH, 'msg:txLastNameMaxLength')
//         .matches(rxFirstLastName, 'msg:txLastNameSpecialCharacters'),
//     email_text: yup.string().max(EMAIL_LENGTH, 'msg:txEmailMaxLength'),
//     bio: yup.string().max(BIO_LENGTH, 'msg:txBioMaxLength'),
//     mission: yup.string().max(MISSION_LENGTH, 'msg:txMissionMaxLength'),
//     passions: yup.array().min(1, 'msg:txSocialPassionRequired').max(5),
//     location: yup.string(),
//     phone: yup.string().max(PHONE_NUMBER_LENGTH),
//     latitude: yup.number(),
//     longitude: yup.number(),
//     mobile_countries_id: yup.number(),
//     country_id: yup.string(),
//     country_id_ja: yup.string(),
//     city: yup.object(),
//     city_ja: yup.object(),
//     address_detail: yup.string().max(ADDRESS_LENGTH, 'msg:txCityMaxLength'),
//     description_search: yup.string(),
//     description_search_ja: yup.string(),
// });

export const changePasswordValidate: yup.SchemaOf<FormChangePasswordType> = yup
  .object()
  .shape({
    current_password: yup
      .string()
      .required('changePassword:txCurrentPasswordRequired'),
    new_password: yup
      .string()
      .required('changePassword:txNewPasswordRequired')
      .max(NEW_PASSWORD_MAX_LENGTH, 'msg:txNewPasswordMaxLength')
      .test('samePassword', 'msg:txNewPassSameOldPass', (value, ctx) => {
        if (value && ctx.parent.current_password === value) {
          return false;
        }
        return true;
      })
      .test('passwordSpace', 'msg:txPasswordHasSpace', (value) => {
        if (value && value.split(' ').length > 1) {
          return false;
        }
        return true;
      })
      .min(7, 'msg:txPasswordIncorrect')
      .matches(rxHasNumber, 'msg:txPasswordIncorrect'),
    confirm_new_password: yup
      .string()
      .required('changePassword:txConfirmNewPasswordRequired')
      .oneOf(
        [undefined, '', yup.ref('new_password')],
        'msg:txConfirmPasswordNotMatch',
      ),
  });

export const formSendEmailValidate: yup.SchemaOf<SendEmailType> = yup
  .object()
  .shape({
    email: yup
      .string()
      .required('msg:txEmailRequired')
      .max(EMAIL_LENGTH, 'msg:txEmailMaxLength')
      .test('checkEmail', 'msg:txEmailInvalid', (value) => {
        if (typeof value !== 'string') {
          return true;
        } else {
          return !rxEmailDoubleSpec.test(value) && rxEmail.test(value);
        }
      }),
  });

export const formResetPasswordValidate: yup.SchemaOf<FormResetPasswordType> =
  yup.object().shape({
    new_password_forgot: yup
      .string()
      .required('msg:txNewPasswordRequired')
      .min(7, 'msg:txPasswordIncorrect')
      .matches(rxHasNumber, 'msg:txPasswordIncorrect')
      .max(NEW_PASSWORD_MAX_LENGTH, 'msg:txNewPasswordMaxLength'),
    confirm_password: yup
      .string()
      .required('msg:txConfirmResetPassword')
      .oneOf(
        [undefined, '', yup.ref('new_password_forgot')],
        'msg:txConfirmNewPasswordNotMatch',
      ),
  });

export const schemaChangePassword = Joi.object({
  currentPassword: Joi.string().min(8).required().messages({
    'string.base': `Password should be a type of 'text'`,
    'string.empty': `Password cannot be an empty field`,
    'string.min': `Password should have a minimum length of {#limit}`,
    'any.required': `Password is a required field`,
  }),
  newPassword: Joi.string().min(8).required().messages({
    'string.base': `Password should be a type of 'text'`,
    'string.empty': `Password cannot be an empty field`,
    'string.min': `Password should have a minimum length of {#limit}`,
    'any.required': `Password is a required field`,
  }),
  confirmNewPassword: Joi.string()
    .min(8)
    .valid(Joi.ref('newPassword '))
    .required()
    .messages({
      'any.only': '{{#label}} does not match',
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
  newPassword: Joi.string().min(8).required().messages({
    'string.base': `Password should be a type of 'text'`,
    'string.empty': `Password cannot be an empty field`,
    'string.min': `Password should have a minimum length of {#limit}`,
    'any.required': `Password is a required field`,
  }),
  confirmNewPassword: Joi.string()
    .min(8)
    .valid(Joi.ref('newPassword '))
    .required()
    .messages({
      'any.only': '{{#label}} does not match',
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

export const schemaOnboardingStep5 = Joi.object({
  country: Joi.required().label('Country').messages({
    'any.required': `cannot be an empty field`,
  }),
  city: Joi.required().label('City').messages({
    'any.required': `cannot be an empty field`,
  }),
});
export const schemaOnboardingStep6 = Joi.object({
  availableProject: Joi.required().label('availableProject').messages({
    'any.required': `cannot be an empty field`,
  }),
});
export const schemaOnboardingStep7 = Joi.object({
  countryNumber: Joi.required().label('countryNumber').messages({
    'any.required': `cannot be an empty field`,
  }),
  phoneNumber: Joi.string()
    .regex(rxNotMobileNumber)
    .required()
    .label('phoneNumber')
    .messages({
      'any.required': `cannot be an empty field`,
      'string.pattern.base': `Phone number must have 10 digits.`,
    }),
});
export const schemaOnboardingStep8 = Joi.object({
  bio: Joi.string().max(160).required().label('Bio').messages({
    'any.required': `cannot be an empty field`,
  }),
});

export const schemaSignupStep1 = Joi.object({
  firstName: Joi.string().required().label('FirstName').messages({
    'string.empty': `cannot be an empty field`,
  }),
  lastName: Joi.string().required().label('LastName').messages({
    'string.empty': `LastName cannot be an empty field`,
  }),
});
export const schemaSignupStep2 = Joi.object({
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
export const schemaSignupStep3 = Joi.object({
  password: Joi.string().min(8).required().messages({
    'string.base': `Password should be a type of 'text'`,
    'string.empty': `Password cannot be an empty field`,
    'string.min': `Password should have a minimum length of {#limit}`,
    'any.required': `Password is a required field`,
  }),
  confirmPassword: Joi.string()
    .min(8)
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': '{{#label}} does not match',
      'string.base': `Confirm password should be a type of 'text'`,
      'string.empty': `Confirm password cannot be an empty field`,
      'any.required': `Confirm password is a required field`,
    }),
});

export const stringSingleSpace = (source?: string) => {
  if (typeof source !== 'string') {
    return '';
  }
  return source.trim().replace(/  +/g, ' ');
};
