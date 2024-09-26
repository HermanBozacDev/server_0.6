import express from 'express';
import { verifyToken } from '../config.js'; // Asegúrate de que este middleware está bien importado

const router = express.Router();

router.get('/api/panelAdminEvento', verifyToken, (req, res) => {
  // Solo usuarios autenticados pueden acceder aquí
  res.json({ message: 'Bienvenido al panel de administración' });
});

export default router;

