import {countAllProducts, createProductCategory, findProductCategories, findUserById} from "../services";
import createError from 'http-errors'
export class ProductCategoryController {
    static async createProductCategory(id, req, res, next) {
        try {

            const user = await findUserById(id);

            if (user.role != 'admin') {
                throw new createError.Unauthorized('Forbbiden, you must be an administrator');
            }

            const productCategory = await createProductCategory(req.body)

            res.status(201).json(
                productCategory)

        } catch (error) {
            next(error)
        }
    }

    static async findAllProductCategories(req, res, next) {
        try {

            const product_categories = await findProductCategories()

            res.status(200).json(
                product_categories,)

        } catch (error) {
            next(error)
        }
    }

}