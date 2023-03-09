import { Product } from "../models";

export const createProduct = async (data) => {

    const product = new Product(data)
    return await product.save()
}

export const findProducts = async (is_active=true, is_deleted=false, limit=50, page=1) => {

    return Product.find({is_active: is_active, is_deleted:is_deleted})
        .populate({path: 'category', select: 'name'})
        .populate({path: 'created_by', select: 'name'})
        .sort({created_at: -1})
        .limit(limit *1)
        .skip((page - 1) * limit);
}

export const findProductById = async (id) => {
    return Product.findOne({
        _id: id,
    });
}

export const findProductByIdAndUpdate = async (id, data) => {
    return Product.findByIdAndUpdate(id, data, {
        new: true
    });
}

export const countAllProducts = async (is_active=true, is_deleted=false, limit=50, page=1) => {
    return Product.where({is_active:is_active, is_deleted:is_deleted})
        .sort({created_at: -1})
        .count()
}