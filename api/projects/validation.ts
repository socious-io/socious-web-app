import Joi from 'joi';
import enums from '@socious/data';

export const schemaCreateProjectStep1 = Joi.object({
  causes_tags: Joi.array()
    .required()
    .items(Joi.string().valid(...Object.values(enums.SocialCauses)))
    .min(1)
    .max(5),
});

export const schemaCreateProjectStep2 = Joi.object({
  skills: Joi.array().required().items(Joi.string()).min(1).max(10),
});
export const schemaCreateProjectStep3 = Joi.object({
  title: Joi.string().trim().required().messages({
    'string.empty': `Title is required for Project.`,
    'string.base': `Title is required.`,
  }),
  description: Joi.string().trim().required().messages({
    'string.empty': `Description is required for Project.`,
    'string.base': `Description is required.`,
  }),
  remote_preference: Joi.string()
    .valid(...Object.values(enums.ProjectRemotePreferenceType))
    .required()
    .messages({
      'string.empty': `Remote Preference is required for Project.`,
      'string.base': `Remote Preference is required.`,
    }),
  payment_type: Joi.string()
    .required()
    .allow(...Object.values(enums.ProjectPaymentType)),
  payment_scheme: Joi.string().allow(
    ...Object.values(enums.ProjectPaymentSchemeType),
  ),
  payment_currency: Joi.string().allow('', null),
  commitment_hours_lower: Joi.when('payment_scheme', {
    is: 'HOURLY',
    then: Joi.number().required().positive().integer().messages({
      'number.base': '`Commitment is required for Project.',
      'number.empty': '`Commitment is required for Project.',
      'number.positive': 'Commitment range lower must be a positive number',
    }),
  }),
  commitment_hours_higher: Joi.when('payment_scheme', {
    is: 'HOURLY',
    then: Joi.number()
      .required()
      .positive()
      .integer()
      .greater(Joi.ref('commitment_hours_lower'))
      .messages({
        'number.base': '`Commitment is required for Project.',
        'number.empty': '`Commitment is required for Project.',
        'number.positive': 'Commitment range higher must be a positive number',
        'number.greater': 'Commitment range is invalid',
      }),
  }),

  payment_range_lower: Joi.when('payment_type', {
    is: 'PAID',
    then: Joi.number().positive().integer().required().messages({
      'number.base': '`Payment is required for Project.',
      'number.empty': '`Payment is required for Project.',
      'number.positive': 'Payment range lower must be a positive number',
    }),
  }),
  payment_range_higher: Joi.when('payment_type', {
    is: 'PAID',
    then: Joi.number()
      .positive()
      .integer()
      .required()
      .greater(Joi.ref('payment_range_lower'))
      .messages({
        'number.base': '`Payment is required for Project.',
        'number.empty': '`Payment is required for Project.',
        'number.positive': 'Payment range lower must be a positive number',
        'number.greater': 'Payment range is invalid',
      }),
  }),
  experience_level: Joi.number(),
  project_type: Joi.string()
    .required()
    .allow(...Object.values(enums.ProjectType)),
  project_length: Joi.string()
    .required()
    .allow(...Object.values(enums.ProjectLengthType)),
  country: Joi.string().required().min(2).max(3),
  city: Joi.when('country', {
    is: 'XW',
    then: Joi.string(),
    otherwise: Joi.string().required(),
  }),
});

export const schemaCreateProjectQuestion = Joi.object({
  question: Joi.string().required().messages({
    'any.required': 'Question cannot be empty.',
    'string.base': 'Question cannot be empty.',
  }),
  required: Joi.boolean(),
  options: Joi.array()
    .allow(null, '')
    .min(2)
    .max(5)
    .items({
      id: Joi.number(),
      option: Joi.string().trim().required().messages({
        'string.base': 'Option can be empty.',
        'string.empty': 'Option can be empty.',
        'any.required': 'Option cannot be empty.',
      }),
    })
    .messages({
      'array.min': 'Mininum of 2 choices required.',
      'array.max': 'Maximum of 5 choices allowed.',
    }),
});

export const schemaCreateProjectQuestionBody = Joi.object({
  questions: Joi.array().items(schemaCreateProjectQuestion),
});

export const schemaApplyProject = Joi.object({
  cover_letter: Joi.string().trim().required().messages({
    'any.required': 'Cover letter is required.',
    'string.empty': `Cover letter is required.`,
    'string.base': `Cover letter is required.`,
  }),
  answers: Joi.array()
    .allow(null, '')
    .max(5)
    .items({
      id: Joi.string(),
      required: Joi.boolean().required(),
      checkbox: Joi.boolean().required(),
      answer: Joi.string().when('required', {
        is: true,
        then: Joi.string().when('checkbox', {
          is: true,
          then: Joi.string().allow(null, ''),
          otherwise: Joi.string().trim().required().messages({
            'any.required': 'Answer is required.',
            'string.base': 'Answer is required.',
            'string.empty': 'Answer is required.',
          }),
        }),
        otherwise: Joi.string().allow(null, ''),
      }),
      selected_option: Joi.number().when('required', {
        is: true,
        then: Joi.number().when('checkbox', {
          is: true,
          then: Joi.number().required().messages({
            'number.base': 'Please select an option.',
            'any.required': 'Please select an option.',
          }),
          otherwise: Joi.number().allow('', null),
        }),
        otherwise: Joi.number().allow(null, ''),
      }),
    }),
  share_contact_info: Joi.boolean(),
  cv_link: Joi.string().uri().allow('', null).messages({
    'string.empty': `Link URL is required.`,
    'string.base': `Link URL is required.`,
    'string.uri': `Please enter a valid url.`,
  }),
  cv_name: Joi.string().allow('', null).messages({
    'string.empty': `Link name is a string.`,
    'string.base': `Link name is required.`,
  }),
});
