const Joi = require('@hapi/joi');

const numvalidation = Joi.object().keys({
    inputparamnumber: Joi.number().positive().required(),
});

export default numvalidation;