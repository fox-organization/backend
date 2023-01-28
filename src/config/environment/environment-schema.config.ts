import * as Joi from 'joi';
import { baseSchema } from './base-schema.config';

/* eslint-disable unicorn/prefer-spread */
export const environmentSchema = Joi.object().concat(baseSchema);
/* eslint-enable unicorn/prefer-spread */
