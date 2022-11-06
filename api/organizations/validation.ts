import Joi from 'joi';
import {rxExpiryDate, rxNoSpecialCharactersMultiWords} from 'utils/regex';

export const creditCardSchema = Joi.object({
  name: Joi.string()
    .required()
    .label('Name')
    .regex(rxNoSpecialCharactersMultiWords)
    .messages({
      'string.empty': `Please enter a name.`,
      'string.pattern.base': `Should not contain special characters.`,
      'any.required': `Please enter a name.`,
    }),
  card_number: Joi.string()
    .creditCard()
    .required()
    .label('Card number')
    .messages({
      'string.empty': `Please enter valid card number`,
      'string.creditCard': `Please enter valid card number`,
      'any.required': `Please enter valid card number`,
    }),
  expiry_date: Joi.string()
    .required()
    .label('Expiry date')
    .pattern(rxExpiryDate)
    .messages({
      'string.empty': `Please Enter expiry date`,
      'string.pattern.base': 'Should be valid expiry date',
      'any.required': `Please Enter expiry date`,
    }),
  cvc: Joi.number()
    .label('CVC')
    .integer()
    .min(100)
    .max(999)
    .required()
    .messages({
      'number.empty': `CVC cannot be an empty field`,
      'number.base': 'CVC should be a number',
      'number.min': 'Should be 3 digits',
      'number.max': 'Should be 3 digits',
      'any.required': 'CVC is required',
    }),
});
