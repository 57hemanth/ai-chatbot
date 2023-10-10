import jwt from "jsonwebtoken"

const authenticateUser = async (req, res, next) => {
    const { token } = req.signedCookies
    try {
        if(token){
            const verify = await jwt.verify(token, process.env.JWT_SECRET)
            if(verify){
                req.user = { name: verify.name, email: verify.email, chats: verify.chats }
                next()
            } else {
                res.status(401).send({ message: "You are not authorized" })
            }
        } else {
            res.status(401).send({ message: "Token not found" })
        }
    } catch(error) {
        res.status(500).send({ message: error.message })
    }
}

export default authenticateUser