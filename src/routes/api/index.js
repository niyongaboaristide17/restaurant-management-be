import express from "express";

import userRouter from "./user.router";
import productCategoriesRouter from "./productCategories.router";
import ProductRouter from "./product.router";
import OtherRouter from "./other.router";

const router = express.Router()

router.use('/users', userRouter)
router.use('/product-categories', productCategoriesRouter)
router.use('/products', ProductRouter)
router.use('/check', OtherRouter)

export default router