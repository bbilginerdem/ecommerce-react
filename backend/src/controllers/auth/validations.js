import Joi from 'joi';

// joi used to validate data
const Schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

export default Schema;
