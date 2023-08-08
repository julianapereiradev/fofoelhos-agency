import joi from "joi";

//validation schema para post e update que será 1 só

export const bunnySchema = joi.object({
    name: joi.string().required()
    //completar
});