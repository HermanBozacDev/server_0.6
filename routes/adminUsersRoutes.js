import express from 'express';
import Admin from '../models/admin.js'; // Modelo de usuario


const router = express.Router();


router.get('/adminUsers', async (req, res) => {
  try {
    const users = await Admin.find(); // Obtener todos los usuarios del modelo Admin
    res.status(200).json(users);
  } catch (error) {
    console.error('[GET] /adminUsers - Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
});
