import Joi from '@hapi/joi';

const numvalidation = Joi.object().keys({
    inputparamnumber: Joi.number().positive().required(),
});


const createValidation = Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().integer().required(),
    description: Joi.string().required(),
});
const updatevalidations = Joi.object().keys({
    name:Joi.string().strict().trim(),
    price:Joi.number().integer().positive(),
    description:Joi.string().strict().trim(),
    id: Joi.number().positive().required()
});
export default {numvalidation, createValidation,updatevalidations};