// routes/registerRoutes.js
import express from 'express';
import Productor from '../models/productores.js'; // Asegúrate de tener este modelo definido
import { verifySuperAdminToken } from '../middlewares/auth.js';
const router = express.Router();

/**
 * DELETE /producers
 * Ruta para eliminar un usuario productor. 
 */
router.delete('/', verifySuperAdminToken, async (req, res) => {
  const { id } = req.body; // Obtener el ID del cuerpo de la solicitud

  try {
    const deletedUser = await Productor.findByIdAndDelete(id);
    if (!deletedUser) {
      console.warn("[DELETE] /producers - Usuario no encontrado:", id);
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    console.log("[DELETE] /producers - Usuario eliminado:", id);
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error("[DELETE] /producers - Error al eliminar usuario:", error);
    res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
});

export default router;
