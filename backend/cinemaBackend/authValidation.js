const Joi = require('joi');

const registerValidation = data =>{
    const schema = Joi.object(
        {
            firstname: Joi.string().required(),
            lastname: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().min(8).required()
        }
    )
    return schema.validate(data);
}

const loginValidation = data =>{
    const schema = Joi.object(
        {
            email: Joi.string().required().email(),
            password: Joi.string().min(8).required()
        }
    )
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
