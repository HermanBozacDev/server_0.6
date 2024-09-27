// routes/registerRoutes.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Productor from '../models/productores.js'; // Asegúrate de tener este modelo definido
import { SECRET_KEY } from '../config.js'; // Asegúrate de importar SECRET_KEY desde tu archivo de configuración

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  console.log("solicitud de registro");

  try {
    // Verificar si el usuario ya existe
    const existingUser = await Productor.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }
    console.log("user no existe")
    // Cifrar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hasie contra")
    // Crear el nuevo usuario
    const newUser = new Productor({ username, password: hashedPassword });
    await newUser.save();

    // Generar un token JWT
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

    // Responder con el token y la URL de redirección
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      redirectUrl: 'https://www.imperioticket.com/panelAdminEvento'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
});

export default router;

