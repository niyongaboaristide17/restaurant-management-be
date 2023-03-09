import mongoose from "mongoose";

const mode = process.env.NODE_ENV || 'development'
const connectDatabase = async (uri, options) => {
    mongoose.set('strictQuery', true)
    await mongoose.connect(uri, options)
}
export default connectDatabase