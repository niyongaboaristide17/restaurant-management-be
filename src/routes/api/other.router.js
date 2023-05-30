import express from 'express'

import {authenticate} from "../../middlewares/authenticate";

const router = express.Router()

router.get('/',authenticate, (id, req, res, next) => {
    return res.status(200).json(
        'USER VALID'
    )
})
export default router