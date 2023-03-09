import {createUser, findUserByEmail, findUserById, findUserByIdAndUpdate, findUsers} from "../services";
import createError from 'http-errors'
import {generateAccessToken} from "../utils/jwt.functions";
import {compare} from "../utils/bcrypt.functions";

export class UserController {
    static async registerUser(req, res, next) {
        try {

            const user = await findUserByEmail(req.body.email);
            if (user) {
                throw new createError.Conflict('User already registered')
            }
            const createdUser = await createUser(req.body)
            const accessToken = generateAccessToken({
                id: createdUser._id,
                role: createdUser.role
            })
            res.status(201).json({
                accessToken,
                role: createdUser.role
            })
        } catch (error) {
            next(error)
        }
    }

    static async patchUpdateUser(id, req, res, next) {
        try {

            const authUser = await findUserById(id);

            if (!authUser) {
                throw new createError.NotFound('User not exist')
            }

            if (authUser.role !== 'admin') {
                throw new createError.Unauthorized('Not allowed to create user. only admin users are allowed')
            }

            const uid = req.params.id

            const u = await findUserByIdAndUpdate(uid, req.body)

            res.status(201).json({
                ...u,
            })

        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const user = await findUserByEmail(req.body.email);

            if (!user) {
                throw new createError.Unauthorized('Unauthorized');
            }

            const userRoles = ['admin', 'vendor']

            if (!userRoles.includes(user.role)) {
                throw new createError.Unauthorized('Unauthorized');
            }

            if (compare(req.body.password, user.password) == false) {
                console.log(req.body.password, user.password);
                throw new createError.Unauthorized('Unauthorized');
            }

            const accessToken = generateAccessToken({
                id: user._id,
                role: user.role
            })

            res.status(200).json({
                accessToken,
                role: user.role
            })

        } catch (error) {
            next(error)
        }
    }

    static async findAllUsers( req, res, next) {
        try {
            const users = await findUsers()
            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }
}