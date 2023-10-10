import User from "../models/userModel.js"
import openai from "../config/openai.js"

const getAllChats = async (req, res) => {
    const user = req.user
    try {
        const findUser = await User.findOne({ email: user.email })
        if(findUser){
            let chats = []
            chats = findUser.chats.map(chat => {
                return { role: chat.role, content: chat.content }
            })
            res.status(200).send({ chats })
        } else {
            res.status(400).send({ message: "User not found" })
        }

    } catch(error) {
        res.status(500).send({ message: error.message })
    }
}

const newChat = async (req, res) => {
    const user = req.user
    const chatData = req.body
    try {
        const findUser = await User.findOne({ email: user.email })
        if(findUser) {
            findUser.chats.push(chatData)
            findUser.save()
            res.send(findUser)
        } else {
            res.status(400).send({ message: "User not found" })
        }
    } catch(error) {
        res.status(500).send({ message: error.message })
    }
}

const generateChat = async (req, res) => {
    const user = req.user
    const chat = req.body
    try {
        if(chat){
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: chat
            })
            const chatRes = { role: "assistant", content: completion.choices[0].message.content }
            const findUser = await User.findOne({ email: user.email })
            if(findUser) {
                findUser.chats.push(chatRes)
                findUser.save()
                res.status(200).send(chatRes)
            } else {
                res.status(400).send({ message: "User not found" })
            }
        } else {
            res.status(500).send({ message: "Chat not received" })
        }
    } catch(error) {
        res.status(500).send({ message: error.message })
    }
}

const deleteChats = async (req, res) => {
    const user = req.user
    try {
        const findUser = await User.findOne({ email: user.email })
        if(findUser){
            findUser.chats = []
            findUser.save()
            res.status(200).send({ message: "Chats deleted successfully" })
        } else {
            res.status(400).send({ message: "User not found" })
        }
    } catch(error) {
        res.status(500).send({ message: error.message })
    }
}

export { getAllChats, newChat, generateChat, deleteChats }