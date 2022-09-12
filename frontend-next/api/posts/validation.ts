import Joi from 'joi';

export const schemaCreatePost = Joi.object({
  content: Joi.string().required().messages({
    'string.empty': `Content is required for Post.`,
    'string.base': `Content is required.`
  }),
  media: Joi.array().items(Joi.string()),
  hashtags: Joi.array().items(Joi.string()),
  causes_tags: Joi.string().required().messages({
    'string.empty': "Select relevant social cause",
    'string.base': "Select relevant social cause"
  }),
  link: Joi.string().allow('', null),
  identity_tags: Joi.array().items(Joi.string()),
})

export const schemaSharePost = Joi.object({
  content: Joi.string().allow("", null),
  causes_tags: Joi.string().allow("", null),
  link: Joi.string().allow("", null),
})