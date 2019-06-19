import Joi from '@hapi/joi';

const numvalidation = Joi.object().keys({
    inputparamnumber: Joi.number().positive().required(),
});


const createValidation = Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().integer().required(),
    description: Joi.string().required(),
});
export default {numvalidation, createValidation};