import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/connectDB.js"
import userRouter from "./routers/userRouter.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import chatsRouter from "./routers/chatsRouter.js"

// Configuarations
const app = express()
dotenv.config()
app.use(morgan("dev"))
const PORT = process.env.PORT || 5000

app.use(cors({
    credentials: true, origin: "http://localhost:5173"
}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.json())

app.use("/api/user", userRouter)
app.use("/api/chats", chatsRouter)

connectDB()
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})