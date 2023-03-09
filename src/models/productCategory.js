import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    created_at: {
        type: Date,
        default: Date.now()
    },
    is_active: {
        type: Boolean, required: true, default: true
    }
})

export const ProductCategory = mongoose.model('ProductCategory', schema)