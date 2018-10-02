import Joi from 'joi';

export default {
  createProduct: {
    body: {
      productName: Joi.string()
        .min(3)
        .required(),
      shortDescription: Joi.string()
        .required(),
      fullDescription: Joi.string(),
    },
  },
};
