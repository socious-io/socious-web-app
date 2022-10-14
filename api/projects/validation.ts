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
  payment_range_lower: Joi.number()
    .required()
    .less(Joi.ref('payment_range_higher')),
  payment_range_higher: Joi.number().required(),
  experience_level: Joi.number().required(),
  project_type: Joi.string()
    .required()
    .allow(...Object.values(enums.ProjectType)),
  project_length: Joi.string()
    .required()
    .allow(...Object.values(enums.ProjectLengthType)),
  country: Joi.string().required().min(2).max(3),
});

export const schemaCreateProjectQuestion = Joi.object({
  question: Joi.string().required(),
  required: Joi.boolean(),
  options: Joi.array().min(2).max(5).items(Joi.string()),
});

export const schemaApplyProject = Joi.object({
  cover_letter: Joi.string().trim().required(),
  share_contact_info: Joi.boolean(),
});

export const schemaLink = Joi.object({
  cv_link: Joi.string().uri().required().messages({
    'string.empty': `Link URL is required.`,
    'string.base': `Link URL is required.`,
  }),
  cv_name: Joi.string().required().messages({
    'string.empty': `Link name is required.`,
    'string.base': `Link name is required.`,
  }),
});
