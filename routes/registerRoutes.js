// routes/registerRoutes.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Productor from '../models/productores.js'; // Asegúrate de tener este modelo definido
import { SECRET_KEY } from '../config.js'; // Asegúrate de importar SECRET_KEY desde tu archivo de configuración
import { verifySuperAdminToken  } from '../middlewares/auth.js';
const router = express.Router();

/**
 * POST /register
 * Ruta para registrar un nuevo usuario. Cifra la contraseña y guarda el nuevo usuario en la base de datos.
 * Responde con un token JWT y una URL de redirección.
 */
router.post('/', verifySuperAdminToken,  async (req, res) => {  
  const { username, password, role } = req.body;
  try {
    // Verificar si el usuario ya existe
    const existingUser = await Productor.findOne({ username });
    if (existingUser) {
      console.warn("[POST] /register - Usuario ya existe:", username);
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    console.log("[POST] /register - Usuario no existe, procediendo a crear uno nuevo");

    // Cifrar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("[POST] /register - Contraseña cifrada");

    // Crear el nuevo usuario
    const newUser = new Productor({ username, password: hashedPassword, role });
    await newUser.save();
    console.log("[POST] /register - Usuario guardado en la base de datos");

    // Generar un token JWT
    const token = jwt.sign({ username, role }, SECRET_KEY, { expiresIn: '1h' });
    console.log("[POST] /register - Token JWT generado");

    // Responder con el token y la URL de redirección
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      redirectUrl: 'https://www.imperioticket.com/panelAdminEvento'
    });
  } catch (error) {
    console.error("[POST] /register - Error al registrar usuario:", error);
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
});

export default router;
