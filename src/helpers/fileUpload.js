import 'dotenv/config'
import cloudinary from "cloudinary"

export const uploadFile = async (file) => {
    let imageUrl = ''
    await cloudinary.v2.uploader.upload(
        file.path,
        {folder: 'restaurant'},
        (error, result) => {
            if (error) {
                throw new Error(error);
            } else {
                imageUrl = result.url
            }
        })
    return imageUrl
}