import express from 'express';
import Admin from '../models/admin.js'; // Modelo de usuario

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('[GET] /adminUsers - Solicitud recibida');
  
  try {
    const users = await Admin.find(); // Obtener todos los usuarios del modelo Admin
    console.log('[GET] /adminUsers - Usuarios encontrados:', users); // Log para verificar los usuarios encontrados
    
    if (users.length === 0) {
      console.log('[GET] /adminUsers - No se encontraron usuarios');
      return res.status(200).json({ message: 'No hay usuarios disponibles' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('[GET] /adminUsers - Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
});

export default router;
