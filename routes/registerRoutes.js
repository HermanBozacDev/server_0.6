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
router.post('/', verifySuperAdminToken, async (req, res) => {  
  const { username, password, role } = req.body;

  try {
    const existingUser = await Productor.findOne({ username });
    if (existingUser) {
      console.warn("[POST] /register - Usuario ya existe:", username);
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    console.log("[POST] /register - Usuario no existe, procediendo a crear uno nuevo");

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("[POST] /register - Contraseña cifrada");

    const newUser = new Productor({ username, password: hashedPassword, role });
    await newUser.save();
    console.log("[POST] /register - Usuario guardado en la base de datos");

    // Responder sin token ni redirección
    res.status(201).json({
      message: 'Usuario registrado exitosamente'
    });
  } catch (error) {
    console.error("[POST] /register - Error al registrar usuario:", error);
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
});

export default router;
