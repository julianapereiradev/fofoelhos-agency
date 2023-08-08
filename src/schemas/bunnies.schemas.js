import joi from "joi";

export const bunnySchema = joi.object({
    name: joi.string().required(),
    age: joi.string().required(),
    description: joi.string().required(),
    breedId: joi.number().required(),
    skinColorId: joi.number().required(),
    sizeId: joi.number().required(),
    url: joi.string().uri().trim().required(),
    active: joi.boolean().required()
});
