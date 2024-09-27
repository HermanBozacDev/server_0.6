// routes/loginRoutes.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Importa JWT para generar el token
import Productor from '../models/productores.js'; // Modelo de usuario
import { SECRET_KEY } from '../config.js'; // Importa la clave secreta

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar al usuario por su username
    const user = await Productor.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si la contraseña es correcta
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Generar un token JWT
    const token = jwt.sign({ username: user.username, id: user._id }, SECRET_KEY, { expiresIn: '1h' });

    // Responder con el token
    res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
});

export default router;

