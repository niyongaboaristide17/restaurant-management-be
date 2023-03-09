import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    role: {
        type: String, required: true, enum: ['admin', 'vendor'],
        default: "vendor"
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    is_active: {
        type: Boolean, required: true, default: true
    }
})

export const User = mongoose.model('User', schema)