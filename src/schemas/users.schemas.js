import joi from "joi";

export const signupSchema = joi.object({
    name: joi.string().trim().required(),
    email: joi.string().email().trim().required(),
    cpf: joi.string().length(11).pattern(/^[0-9]+$/).required(),
    phone: joi.string().min(10).max(11).pattern(/^[0-9]+$/).required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required(),
  });
  
  export const signinSchema = joi.object({
    email: joi.string().email().trim().required(),
    password: joi.string().required()
  });