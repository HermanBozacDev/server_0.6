// routes/notificationRoutes.js
import express from 'express';

import { Payment } from 'mercadopago';
const router = express.Router();

/**
 * POST /notifications
 * Recibe y procesa las notificaciones de Mercado Pago
 */
router.post('/', async (req, res) => {
    console.log('[POST] /notifications - Notificación recibida:', req.body);

    try {
        const { id, type } = req.body; // Extrae el ID y tipo de notificación
        console.log('[POST] /notifications - ID recibido:', id); // Log del ID recibido
        console.log('[POST] /notifications - Tipo de notificación recibido:', type); // Log del tipo de notificación

        // Verifica que el tipo de notificación es 'payment'
        if (type === 'payment') {
            console.log('[POST] /notifications - Notificación de tipo "payment" con ID:', id);

            // Usa el SDK de Mercado Pago para obtener los detalles del pago
            const payment = await Payment.findById(id);
            console.log('[POST] /notifications - Detalles del pago obtenidos:', payment);

            if (!payment) {
                console.error('[POST] /notifications - No se encontró el pago con el ID proporcionado:', id);
                return res.status(404).json({ message: 'Pago no encontrado' });
            }

            // Procesa los detalles del pago (actualización de base de datos, confirmaciones, etc.)
            // Aquí puedes agregar la lógica que necesites

            // Responde indicando que la notificación fue procesada correctamente
            res.status(200).json({ message: 'Notificación procesada correctamente' });
        } else {
            console.log('[POST] /notifications - Tipo de notificación no soportada:', type);
            res.status(400).json({ message: 'Tipo de notificación no soportada' });
        }
    } catch (error) {
        console.error('[POST] /notifications - Error al procesar la notificación:', error);
        res.status(500).json({ message: 'Error interno al procesar la notificación' });
    }
});


export default router;
