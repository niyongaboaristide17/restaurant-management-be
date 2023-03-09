import {
    countAllProducts,
    createProduct,
    findProductByIdAndUpdate,
    findProductCategoryById,
    findProducts
} from "../services";
import {uploadFile} from "../helpers/fileUpload";
import createError from "http-errors";

export class ProductController {

    static async createProduct(id, req, res, next) {
        try {

            const image = await uploadFile(req.file)

            const category = await findProductCategoryById(req.body.category)
            let product = null
            if (category) {
                product = await createProduct({ ...req.body, created_by: id, image })
                await category.products.push(product)
                category.save()
            }else{
                throw new createError().NotFound('category not found')
            }

            console.log(product)
            res.status(201).json(
                product
            )

        } catch (error) {
            next(error)
        }
    }

    static async patchUpdateProduct(id, req, res, next) {
        try {

            const pid = req.params.id

            const product = await findProductByIdAndUpdate(pid, req.body)

            res.status(201).json({
                product,
            })

        } catch (error) {
            next(error)
        }
    }

    static async findProducts(req, res, next) {
        try {
            let {page = 1, limit = 10} = req.query
            page = page <= 0 ? 1 : page
            limit = limit <= 0 ? 10 : limit
            const totalProduct = await countAllProducts(
            )
            let has_next = (page * limit) < totalProduct
            let has_previous =  +page !== 1

            const products = await findProducts(
                true, false, +limit, +page
            )

            let totalPages = limit
            totalPages = limit < totalProduct ? Math.ceil(totalProduct / limit) : 1

            res.status(200).json({
                current: +page,
                has_next,
                has_previous,
                totalPages,
                count: products.length,
                data:products,
            })

        } catch (error) {
            next(error)
        }
    }

}