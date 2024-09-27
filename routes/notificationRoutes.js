// routes/notificationRoutes.js
import express from 'express';
import mercadopago from 'mercadopago'; // Asegúrate de que mercadopago esté instalado

const router = express.Router();

/**
 * POST /notifications
 * Recibe y procesa las notificaciones de Mercado Pago
 */
router.post('/', async (req, res) => {
    console.log('[POST] /notifications - Notificación recibida:', req.body);

    try {
        const { id, type } = req.body; // Extrae el ID y tipo de notificación

        // Verifica que el tipo de notificación es 'payment'
        if (type === 'payment') {
            console.log('[POST] /notifications - Notificación de tipo "payment" con ID:', id);

            // Usa el SDK de Mercado Pago para obtener los detalles del pago
            const payment = await mercadopago.payment.findById(id);
            console.log('[POST] /notifications - Detalles del pago obtenidos:', payment);

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
