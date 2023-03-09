import {User} from '../models'
import {hash} from '../utils/bcrypt.functions'

export const createUser = async (data) => {
    const user = new User({
        ...data,
        password: hash(data.password)
    })
    return await user.save()
}

export const findUsers =  () => {
    return User.find(
        {is_active: true}
    ).select(['-password']);
}

export const findUserByEmail =  (email) => {
    return User.findOne({
        email,
    })
}

export const findUserById = async (id) => {
    return  User.findOne({
        _id: id
    })
}

export const deleteOneUser = async (data) => {
    return  User.deleteOne({
        ...data
    })
}

export const findUserByIdAndUpdate = async (id, data) => {
    return User.findByIdAndUpdate(id, data, {
        new: true
    })
}