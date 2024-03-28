import Joi from "joi";

export const addRequestValidationSchema= Joi.object({
    fullName: Joi.string().required().trim().min(2).max(55),
    bloodType: Joi.string().required().trim().min(2).max(20),
    location: Joi.string().trim().required().min(2).max(55),
    phoneNumber:Joi.number().min(10),
});
