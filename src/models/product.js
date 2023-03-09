import mongoose from 'mongoose'

const opts = {
    toJSON: {virtuals: true}
}

const schema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    image: {
        type: String, required: true
    },
    actual_price: {
        type: Number, required: true
    },
    discount_rate: {
        type: Number, required: true,
        min: [0, 'Discount percentage must not be less than 0'],
        max: [100]
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductCategory"
    },
    is_active: {
        type: Boolean, required: true, default: true
    },
    is_deleted: {
        type: Boolean, required: true, default: false
    }
}, opts)

schema.virtual('discount_price').get(function (){
    return this.actual_price - this.actual_price * this.discount_rate / 100
})
export const Product = mongoose.model('Product', schema)