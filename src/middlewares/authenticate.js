import 'dotenv/config';
import {findUserById} from '../services';
import {decodeAccessToken} from '../utils/jwt.functions';

export const authenticate = async (req, res, next) => {

    try {
        const token = req.headers.authorization
        const data = await decodeAccessToken(token);


        if (!data) {
            return res.status(401).json({
                status: 401,
                error: 'Authentication failed',
            });
        }

        const user = await findUserById(data.id)

        if (!user) {
            return res.status(404).json({
                status: 404,
                error: 'User not exist',
            });
        }

        if (!user.is_active) {
            return res.status(403).json({
                status: 403,
                error: 'Forbbiden, your account must be active',
            });
        }

        next(data.id);

    } catch (error) {
        return res.status(401).json({
            status: 401,
            error: 'Authentication failed',
        });
    }

};