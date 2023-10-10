import { checkToken, loginUser, logoutUser, signupUser } from "../controllers/userCtrl.js"
import express from "express"
import { validateLogin, validateSignup } from "../middlewares/validator.js"

const userRouter = express.Router()

userRouter.post("/signup", validateSignup, signupUser)
userRouter.post("/login", validateLogin, loginUser)
userRouter.post("/auth-token", checkToken)
userRouter.get("/logout", logoutUser)

export default userRouter