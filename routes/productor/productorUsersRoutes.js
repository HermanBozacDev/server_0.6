
import express from 'express';
import Productor from '../../models/productores.js'; // Modelo de usuario
import { verifySuperAdminToken } from '../../middlewares/auth.js'; // Importamos el middleware que verifica el token de superadmin
const router = express.Router();

router.get('/', verifySuperAdminToken, async (req, res) => {
  console.log('[GET] /productorUsers - Solicitud recibida');
  
  try {
    const users = await Productor.find(); // Obtener todos los usuarios del modelo Admin
    console.log('[GET] /productorUsers - Usuarios encontrados:', users); // Log para verificar los usuarios encontrados
    
    if (users.length === 0) {
      console.log('[GET] /productorUsers - No se encontraron usuarios');
      return res.status(200).json({ message: 'No hay usuarios disponibles' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('[GET] /productorUsers - Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
});

export default router;
