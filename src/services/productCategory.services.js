import { ProductCategory } from "../models";

export const createProductCategory = async (data) => {

    const category = new ProductCategory(data)
    return await category.save()
}

export const findProductCategories =  () => {
    return ProductCategory.find({})
}

export const findProductCategoryById =  (id) => {
    return  ProductCategory.findOne({
        _id: id,
    })
}