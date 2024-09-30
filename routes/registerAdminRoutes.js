// routes/registerRoutes.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.js'; // Asegúrate de tener este modelo definido
import { SECRET_KEY } from '../config.js'; // Asegúrate de importar SECRET_KEY desde tu archivo de configuración

const router = express.Router();

/**
 * POST /registerAdmin
 * Ruta para registrar un nuevo usuario. Cifra la contraseña y guarda el nuevo usuario en la base de datos.
 * Responde con un token JWT y una URL de redirección.
 */
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  console.log("[POST] /registerAdmin - Solicitud de registro recibida");

  try {
    // Verificar si el usuario ya existe
    const existingUser = await Admin.findOne({ username });
    if (existingUser) {
      console.warn("[POST] /registerAdmin - Usuario ya existe:", username);
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    console.log("[POST] /registerAdmin - Usuario no existe, procediendo a crear uno nuevo");

    // Cifrar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("[POST] /registerAdmin - Contraseña cifrada");

    // Crear el nuevo usuario
    const newUser = new Admin({ username, password: hashedPassword, role: "superadmin"});
    await newUser.save();
    console.log("[POST] /registerAdmin - Usuario guardado en la base de datos");

    // Generar un token JWT
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    console.log("[POST] /registerAdmin - Token JWT generado");

    // Responder con el token y la URL de redirección
    res.status(201).json({
      message: 'UsuarioAdmin registrado exitosamente',
      token,
      redirectUrl: 'https://www.imperioticket.com/panelAdminEvento'
    });
  } catch (error) {
    console.error("[POST] /registerAdmin - Error al registrar usuario:", error);
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
});

export default router;
