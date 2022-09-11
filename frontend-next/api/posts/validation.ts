import Joi from 'joi';

export const schemaCreatePost = Joi.object({
  content: Joi.string().required().messages({
    'string.empty': `Content is required for Post.`,
    'string.base': `Content is required.`
  }),
  media: Joi.array().items(Joi.string()),
  hashtags: Joi.array().items(Joi.string()),
  causes_tags: Joi.array().items(Joi.string()).min(1).messages({
    'array.min': `Needed atleast 1 social cause.`,
    'array.base': `Needed a social cause.`
  }),
  identity_tags: Joi.array().items(Joi.string()),
})

export const schemaSharePost = Joi.object({
  content: Joi.string().allow("", null),
  causes_tags: Joi.string().allow("", null),
  link: Joi.string().allow("", null),
})