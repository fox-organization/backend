import * as Joi from 'joi';

export const baseSchema = Joi.object({
  APP_ENV: Joi.string()
    .valid('development', 'staging', 'production')
    .default('development'),
  APP_NAME: Joi.string().required(),
  APP_PORT: Joi.number().required(),
  CORS_ORIGIN: Joi.string().required(),
});
