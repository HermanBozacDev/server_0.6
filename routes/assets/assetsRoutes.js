import express from 'express';
import multer from 'multer';
import path from 'path';
const router = express.Router();

// Configuración de multer para almacenar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/uploads'); // Asegúrate de que este directorio exista y sea accesible
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Ruta para subir imágenes
router.post('/', upload.single('image'), (req, res) => {
  console.log('Recibiendo archivo de imagen...'); // Mensaje al iniciar la recepción
  if (req.file) {
    console.log('Imagen subida:', req.file); // Información sobre la imagen
    res.status(200).json({ message: 'Imagen subida con éxito', filePath: `/uploads/${req.file.filename}` });
  } else {
    console.log('Error: No se recibió ningún archivo'); // Mensaje de error
    res.status(400).json({ message: 'Error al subir la imagen' });
  }
});

export default router;
