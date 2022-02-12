const multer = require('multer');
const path = require('path');

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

module.exports = { upload };
