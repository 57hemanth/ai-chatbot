import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const signupUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const findUser = await User.findOne({ email })
        if(findUser){
            res.status(409).send({ message: "User already exits" })
        } else {
            let salt = bcrypt.genSaltSync(10)
            let hashPassword = bcrypt.hashSync(password, salt)
            const user = await User.create({ name, email, password: hashPassword })
            res.status(201).send({ message: "User created successfully", user: { name, email }})
        }
    } catch (error) {
        res.status(500).send({ message: error.message})
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({email})
        res.clearCookie("token")
        if(user){
            const compare = bcrypt.compareSync(password, user.password)
            if(compare) {
                const token = jwt.sign({ name: user.name, email: user.email, chats: user.chats }, process.env.JWT_SECRET, {
                    expiresIn: "1d"
                })
                res.cookie("token", token, {
                    maxAge: 86400000,
                    signed: true,
                    httpOnly: true,
                    secure: true,
                    sameSite: "true"
                })
                res.status(200).send({ message: "Login successful", user: { name: user.name, email: user.email, chats: user.chats } })
            } else {
                res.status(401).send({ message: "Invalid credentials" })
            }
        } else {
            res.status(404).send({ message: "User not found" })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const checkToken = async (req, res) => {
    const { token } = req.signedCookies
    try {
        const verify = await jwt.verify(token, process.env.JWT_SECRET)
        const findUser = await User.findOne({ email: verify.email })
        if(verify && findUser){
            const { name, email, chats } = verify
            res.status(200).send({ name, email, chats })
        } else {
            res.status(401).send({ message: "Token invalid" })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const logoutUser = (req, res) => {
    try {
        res.clearCookie("token")
        console.log("Runn")
        res.status(200).send({ message: "Logout successful" })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

export { signupUser, loginUser, checkToken, logoutUser }