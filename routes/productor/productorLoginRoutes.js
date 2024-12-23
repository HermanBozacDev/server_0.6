
// routes/productor/productorLoginRoutes.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Importa JWT para generar el token
import Productor from '../../models/productores.js'; // Modelo de usuario
import { SECRET_KEY } from '../../config.js'; // Importa la clave secreta

const router = express.Router();

/**
 * POST /login
 * Autentica al usuario y genera un token JWT
 */
router.post('/', async (req, res) => {
  console.log('[POST] /login - Solicitud de inicio de sesión recibida');

  const { username, password } = req.body;

  try {
    // Buscar al usuario por su username
    console.log('[POST] /login - Buscando usuario:', username);
    const user = await Productor.findOne({ username });
    if (!user) {
      console.log('[POST] /login - Usuario no encontrado:', username);
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si la contraseña es correcta
    console.log('[POST] /login - Verificando contraseña para usuario:', username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('[POST] /login - Contraseña incorrecta para usuario:', username);
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Generar un token JWT
    console.log('[POST] /login - Generando token JWT para usuario:', username);
    const token = jwt.sign(
      { username: user.username, id: user._id }, 
      SECRET_KEY, 
      { expiresIn: '1h' }
    );

    // Responder con el token
    console.log('[POST] /login - Inicio de sesión exitoso, enviando token');
    res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error('[POST] /login - Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
});

export default router;
