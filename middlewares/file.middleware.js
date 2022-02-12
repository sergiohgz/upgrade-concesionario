const multer = require('multer');
const path = require('path');

const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
});

const TIPOS_DE_FICHERO_ADMITIDOS = ['image/png', 'image/jpg', 'image/jpeg'];

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (!TIPOS_DE_FICHERO_ADMITIDOS.includes(file.mimetype)) {
            // Caso error -> el tipo de archivo no está soportado
            cb(new Error('Tipo de archivo no soportado'));
        } else {
            cb(null, true);
        }
    },
});

// middleware para subir archivos a cloudinary
const uploadToCloudinary = async (req, res, next) => {
    if (req.file) {
        // Como el archivo existe, vamos a subirlo
        try {
            const filePath = req.file.path;
            // Subimos imagen a cloudinary
            const image = await cloudinary.uploader.upload(filePath);
            // Como la imagen ya está subida, no la necesitamos en el disco duro, asi que la eliminamos
            fs.unlinkSync(filePath);
            // Escribimos la URL con la que podemos obtener la imagen en la petición, para luego guardarla bien en DB
            req.file_url = image.secure_url;
            return next();
        } catch(error) {
            return next(error);
        }
    } else {
        return next();
    }
};

module.exports = { upload, uploadToCloudinary };
