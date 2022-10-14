import Joi from 'joi';
import enums from '@socious/data';

export const schemaOfferApplicant = Joi.object({
  payment_type: Joi.string()
    .required()
    .allow(...Object.values(enums.ProjectPaymentType))
    .messages({
      'any.required': `Payment ype is required.`,
      'string.empty': `Payment ype is required.`,
    }),
  payment_scheme: Joi.string()
    .required()
    .allow(...Object.values(enums.ProjectPaymentSchemeType))
    .messages({
      'any.required': `Payment mode is required.`,
      'string.empty': `Payment mode is required.`,
    }),
  due_date: Joi.date()
    .greater('now')
    .required()
    .allow(null, '')
    .required()
    .messages({
      'date.greater': `Date should be a later date.`,
    }),
  total_hours: Joi.number().allow(null, 0),
  assignment_total: Joi.number().required().messages({
    'any.required': `Assignment total is required.`,
    'number.empty': `Assignment total is required.`,
  }),
  offer_message: Joi.string().trim().required().messages({
    'any.required': `Offer message is required.`,
    'string.empty': `Offer message is required.`,
  }),
});
