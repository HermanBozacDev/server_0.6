// routes/loginRoutes.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Importa JWT para generar el token
import Admin from '../models/admin.js'; // Modelo de usuario
import { SECRET_KEY } from '../config.js'; // Importa la clave secreta

const router = express.Router();

/**
 * POST /loginAdmin
 * Autentica al usuario y genera un token JWT
 */
router.post('/', async (req, res) => {
  console.log('[POST] /loginAdmin - Solicitud de inicio de sesión recibida');

  const { username, password } = req.body;

  try {
    // Buscar al usuario por su username
    console.log('[POST] /loginAdmin - Buscando usuario:', username);
    const user = await Admin.findOne({ username });
    if (!user) {
      console.log('[POST] /loginAdmin - Usuario no encontrado:', username);
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si la contraseña es correcta
    console.log('[POST] /loginAdmin - Verificando contraseña para usuario:', username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('[POST] /loginAdmin - Contraseña incorrecta para usuario:', username);
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Generar un token JWT
    console.log('[POST] /loginAdmin - Generando token JWT para usuario:', username);
    const token = jwt.sign(
      { username: user.username, id: user._id, role: "superadmin" }, 
      SECRET_KEY, 
      { expiresIn: '1h' }
    );

    // Responder con el token
    console.log('[POST] /loginAdmin - Inicio de sesión exitoso, enviando token');
    res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error('[POST] /login - Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
});

export default router;
