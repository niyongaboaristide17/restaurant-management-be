import 'dotenv/config'
import bcrypt from 'bcrypt'

const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND))

export const hash = (plaintText) => {
    return bcrypt.hashSync(plaintText, salt)
}

export const compare = (cipherText, hash) => {
    return bcrypt.compareSync(cipherText, hash)
}