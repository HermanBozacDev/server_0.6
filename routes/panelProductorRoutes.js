import express from 'express';
import { verifyToken } from '../config.js'; // Asegúrate de que este middleware esté bien importado

const router = express.Router();

/**
 * GET /api/panelAdminEvento
 * Ruta protegida por JWT, accesible solo para usuarios autenticados.
 */
router.get('/', verifyToken, (req, res) => {
  console.log('[GET] /api/panelAdminEvento - Acceso autorizado al panel de administración');

  // Solo usuarios autenticados pueden acceder aquí
  res.json({ message: 'Bienvenido al panel de administración' });
});

export default router;
