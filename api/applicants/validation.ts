import Joi from 'joi';
import enums from '@socious/data';

export const schemaOfferApplicant = Joi.object({
  payment_type: Joi.string()
    .required()
    .allow(...Object.values(enums.ProjectPaymentType))
    .messages({
      'any.required': `Payment type is required.`,
      'string.empty': `Payment type is required.`,
    }),
  payment_schema: Joi.string()
    .required()
    .allow(...Object.values(enums.ProjectPaymentSchemeType))
    .messages({
      'any.required': `Payment mode is required.`,
      'string.empty': `Payment mode is required.`,
    }),
  total_hours: Joi.string().when('payment_schema', [
    {
      is: 'FIXED',
      then: Joi.string().required().messages({
        'any.required': `Estimated total hours is required.`,
        'string.base': `Estimated total hours is required.`,
        'string.empty': `Estimated total hours is required.`,
      }),
      otherwise: Joi.allow(null, 0, ''),
    },
  ]),
  due_date: Joi.date().when('payment_type', [
    {
      is: 'PAID',
      then: Joi.date().when('payment_schema', {
        is: 'FIXED',
        then: Joi.date().required().greater('now').messages({
          'date.base': 'Date should be a valid date.',
          'any.required': 'Date is required.',
          'date.iso': `Date should be a valid date.`,
          'date.greater': `Date should be a later date.`,
        }),
        otherwise: Joi.allow(null, 0, ''),
      }),
      otherwise: Joi.allow(null, 0, ''),
    },
  ]),
  assignment_total: Joi.string().when('payment_type', [
    {
      is: 'PAID',
      then: Joi.string().when('payment_schema', {
        is: 'FIXED',
        then: Joi.string().required().messages({
          'any.required': `Assignment total is required.`,
          'string.base': `Assignment total is required.`,
          'string.empty': `Assignment total is required.`,
        }),
        otherwise: Joi.allow(null, 0, ''),
      }),
      otherwise: Joi.allow(null, 0, ''),
    },
  ]),
  weekly_limit: Joi.number().when('payment_schema', [
    {
      is: 'HOURLY',
      then: Joi.number().when('payment_type', {
        is: 'PAID',
        then: Joi.number().required().messages({
          'any.required': `Weekly limit is required.`,
          'number.base': `Weekly limit should be number.`,
          'number.empty': `Weekly limit is required.`,
        }),
        otherwise: Joi.allow(null, 0, ''),
      }),
      otherwise: Joi.allow(null, 0, ''),
    },
  ]),
  hourly_rate: Joi.number().when('payment_schema', [
    {
      is: 'HOURLY',
      then: Joi.number().when('payment_type', {
        is: 'PAID',
        then: Joi.number().required().messages({
          'any.required': `Hourly rate is required.`,
          'number.base': `Hourly rate must be a number.`,
          'number.empty': `Hourly rate is required.`,
        }),
        otherwise: Joi.allow(null, 0, ''),
      }),
      otherwise: Joi.allow(null, 0, ''),
    },
  ]),
  weekly_commitment: Joi.string().when('payment_schema', [
    {
      is: 'HOURLY',
      then: Joi.string().when('payment_type', {
        is: 'VOLUNTEER',
        then: Joi.string().required().messages({
          'any.required': `Weekly commitment is required.`,
          'string.base': `Weekly commitment is required.`,
          'string.empty': `Weekly commitment is required.`,
        }),
        otherwise: Joi.allow(null, 0, ''),
      }),
      otherwise: Joi.allow(null, 0, ''),
    },
  ]),
  offer_message: Joi.string().trim().required().messages({
    'any.required': `Offer message is required.`,
    'string.empty': `Offer message is required.`,
  }),
});
