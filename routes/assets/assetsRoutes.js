import express from 'express';
import multer from 'multer';
import path from 'path';
const router = express.Router();

// Configuración de multer para almacenar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Asegúrate de que este directorio exista
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Ruta para subir imágenes
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'image2', maxCount: 1 }]), (req, res) => {
  // req.files contiene información sobre los archivos subidos
  if (req.files) {
    console.log('Imágenes subidas:', req.files); // Agregar el console.log aquí
    res.status(200).json({ message: 'Imágenes subidas con éxito', filePaths: req.files });
  } else {
    console.log('Error: No se recibió ningún archivo'); // Mensaje de error
    res.status(400).json({ message: 'Error al subir las imágenes' });
  }
});

export default router;
