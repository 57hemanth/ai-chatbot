import express from "express"
import { deleteChats, generateChat, getAllChats, newChat } from "../controllers/chatsCtrl.js"
import authenticateUser from "../middlewares/authenticate.js"

const chatsRouter = express.Router()

chatsRouter.get("/", authenticateUser, getAllChats)
chatsRouter.post("/new", authenticateUser, newChat)
chatsRouter.post("/generate", authenticateUser, generateChat)
chatsRouter.delete("/delete", authenticateUser, deleteChats)

export default chatsRouter