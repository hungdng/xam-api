import Joi from 'joi';

export default {
  signup: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required(),
      fullname: Joi.string().required(),
    },
  },
};
