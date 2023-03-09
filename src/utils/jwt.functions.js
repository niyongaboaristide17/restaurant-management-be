import jwt from "jsonwebtoken";

import 'dotenv/config'

const JWT_SECRET_KEY = String(process.env.JWT_SECRET_KEY)
const JWT_LIFETIME = String(process.env.JWT_LIFETIME)

export const generateAccessToken = (payload) => {
    return jwt.sign(
        {payload},
        JWT_SECRET_KEY,
        {
            expiresIn: JWT_LIFETIME
        }
    )
}

export const decodeAccessToken = async (token) => {
    try {
        const sentToken = token.split(" ")
        if (sentToken.length != 2) {
            return null
        }
        if (sentToken[0].toLowerCase() != 'bearer') {
            return null
        }
        const data = jwt.verify(sentToken[1], JWT_SECRET_KEY)
        return {...data.payload};

    } catch (error) {
        return null
    }
}