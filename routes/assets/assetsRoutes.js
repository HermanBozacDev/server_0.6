import express from 'express';
import  multer from 'multer';
import  patch from 'patch';

const app = express();

// Configuración de multer para almacenar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directorio donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombres únicos para evitar colisiones
  },
});

const upload = multer({ storage: storage });

// Ruta para subir imágenes
app.post('/uploadImage', upload.single('image'), (req, res) => {
  // req.file contiene información sobre el archivo subido
  if (req.file) {
    res.status(200).json({ message: 'Imagen subida con éxito', filePath: `/uploads/${req.file.filename}` });
  } else {
    res.status(400).json({ message: 'Error al subir la imagen' });
  }
});

// Servir archivos estáticos desde el directorio 'uploads'
app.use('/uploads', express.static('uploads'));
