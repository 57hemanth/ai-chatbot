import mongoose from "mongoose"
import { randomUUID } from "crypto"

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: (true, "Name is required")
    },
    email: {
        type: String,
        required: (true, "Email is required")
    },
    password: {
        type: String,
        required: (true, "Password is required")
    },
    chats: [
        {
            role: {
                type: String,
                emun: ["user", "assistant"]
            },
            content: {
                type: String
            }
        }
    ]
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User