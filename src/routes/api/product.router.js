import express from 'express'
import {ProductController} from "../../controllers";
import {authenticate} from "../../middlewares/authenticate";
import upload from "../../helpers/multer";

const router = express.Router()

router.post('/', upload.single('image'),authenticate, ProductController.createProduct)
router.get('/', ProductController.findProducts)
export default router