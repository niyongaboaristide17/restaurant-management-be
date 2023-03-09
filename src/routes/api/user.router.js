import express from 'express'
import {UserController} from "../../controllers";
import {authenticate} from "../../middlewares/authenticate";

const router = express.Router()

router.post('/', UserController.registerUser)
router.get('/', UserController.findAllUsers)
router.post('/login', UserController.login)

export default router