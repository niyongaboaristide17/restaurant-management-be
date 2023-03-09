import express from 'express'
import {ProductCategoryController} from "../../controllers";
import {authenticate} from "../../middlewares/authenticate";

const router = express.Router()

router.post('/', authenticate, ProductCategoryController.createProductCategory)
router.get('/', ProductCategoryController.findAllProductCategories)

export default router