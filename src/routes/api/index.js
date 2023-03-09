import express from "express";

import userRouter from "./user.router";
import productCategoriesRouter from "./productCategories.router";
import ProductRouter from "./product.router";

const router = express.Router()

router.use('/users', userRouter)
router.use('/product-categories', productCategoriesRouter)
router.use('/products', ProductRouter)

export default router