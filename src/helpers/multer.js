import multer from "multer"

const storage = multer.diskStorage({})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg'
        || file.mimetype === 'image/png'
        || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/webp') {
        cb(null, true)
    }else{
        // reject file
        cb({message: 'Unsupported file format'}, false)
    }
}

const upload = multer({
    storage,
    file:fileFilter,
});

export default upload