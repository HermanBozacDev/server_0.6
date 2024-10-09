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

// Actualización de los campos para aceptar las tres imágenes
router.post('/', upload.fields([
  { name: 'image', maxCount: 1 }, 
  { name: 'image2', maxCount: 1 },
  { name: 'imageDetail', maxCount: 1 }
]), (req, res) => {
  if (req.files) {
    // Construir rutas de archivo individuales
    const filePath1 = req.files['image'] ? req.files['image'][0].path : null;
    const filePath2 = req.files['image2'] ? req.files['image2'][0].path : null;
    const filePathDetail = req.files['imageDetail'] ? req.files['imageDetail'][0].path : null;

    console.log('Imágenes subidas:', { filePath1, filePath2, filePathDetail });
    
    // Responder con los paths de las imágenes
    res.status(200).json({ 
      message: 'Imágenes subidas con éxito', 
      filePath1,
      filePath2,
      filePathDetail 
    });
  } else {
    console.log('Error: No se recibió ningún archivo'); // Mensaje de error
    res.status(400).json({ message: 'Error al subir las imágenes' });
  }
});

export default router;
