import { body, validationResult } from "express-validator";

const singup = [
    body("name").notEmpty(),
    body("email").notEmpty().isEmail(),
    body("password").notEmpty().isLength({ min: 8 })
]

const login = [
    body("email").notEmpty().isEmail(),
    body("password").notEmpty().isLength({ min: 8 })
]

const validateSignup = async (req, res, next) => {
    for(let validation of singup){
        const result = await validation.run(req)
    }
    const errors = validationResult(req)
    if(errors.isEmpty()){
        next()
    } else {
        res.status(401).send({ status: false, message: errors })
    }
}

const validateLogin = async (req, res, next) => {
    for(let validate of login){
        const result = await validate.run(req)
    }
    const errors = validationResult(req)
    if(errors.isEmpty()){
        next()
    } else {
        res.status(400).send({ message: errors })
    }
}

export { validateSignup, validateLogin }