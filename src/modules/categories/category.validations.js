import Joi from 'joi';

export default {
  createCategories: {
    body: {
      categoryName: Joi.string()
        .min(2)
        .required(),
    },
  },
  updateCategories: {
    body: {
      categoryName: Joi.string()
        .min(2)
        .required(),
    },
  },
};
