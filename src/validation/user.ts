import Joi from '@hapi/joi';
import { Request } from 'express';

export const registerValidation = (data: Request) => {
  const validationSchema = Joi.object({
    username: Joi.string().required().min(6).max(255),
    email: Joi.string().required().min(6).max(255).email(),
    password: Joi.string().required().min(6).max(Number.MAX_SAFE_INTEGER),
  });

  return validationSchema.validate(data);
};

export const loginValidation = (data: Request) => {
  const validationSchema = Joi.object({
    email: Joi.string().required().min(6).max(255).email(),
    password: Joi.string().required().min(6).max(Number.MAX_SAFE_INTEGER),
  });

  return validationSchema.validate(data);
};

