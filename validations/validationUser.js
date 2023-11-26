const joi_validation= require('joi')

const registerValidation_joi = (data) => {
    const schemaValidation = joi_validation.object({
        username:joi_validation.string().alphanum().required().min(3).max(256),
        email:joi_validation.string().required().min(6).max(256).email(),
        password:joi_validation.string().required().min(3).max(1024)       
    })
    return schemaValidation.validate(data)
}

const loginValidation_joi = (data) => {
    const schemaValidation = joi_validation.object({
        email:joi_validation.string().required().min(6).max(256).email(),
        password:joi_validation.string().required().min(5).max(1024)      
    })
    return schemaValidation.validate(data)
}

module.exports.registerValidation_joi = registerValidation_joi
module.exports.loginValidation_joi = loginValidation_joi