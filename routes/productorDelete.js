// routes/registerRoutes.js
import express from 'express';
import Productor from '../models/productores.js'; // Asegúrate de tener este modelo definido
import { verifySuperAdminToken } from '../middlewares/auth.js';
const router = express.Router();

/**
 * DELETE /producers/:id
 * Ruta para eliminar un usuario productor. 
 */
router.delete('/producers/:id', verifySuperAdminToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await Productor.findByIdAndDelete(id);
    if (!deletedUser) {
      console.warn("[DELETE] /producers/:id - Usuario no encontrado:", id);
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    console.log("[DELETE] /producers/:id - Usuario eliminado:", id);
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error("[DELETE] /producers/:id - Error al eliminar usuario:", error);
    res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
});

export default router;
