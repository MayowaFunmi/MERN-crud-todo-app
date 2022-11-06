import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

// signup va;idation
const signUpBodyValidation = (body) => {
    const schema = Joi.object({
        username: Joi.string().required().label("UserName"),
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("E-mail"),
        password: passwordComplexity().required().label("Password"),
    });
    return schema.validate(body);
}

// login validation
const loginBodyValidation = (body) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("E-mail"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(body);
}

const refreshTokenBodyValidation = (body) => {
    const schema = Joi.object({
        refreshToken: Joi.string().required().label("Refresh Token"),
    })
    return schema.validate(body);
}
export { signUpBodyValidation, loginBodyValidation, refreshTokenBodyValidation }