import express from 'express';
const router = express.Router();

/**
 * POST /notifications
 * Recibe y procesa las notificaciones de Mercado Pago
 */
router.post('/', async (req, res) => {
    console.log('[POST] /notifications - Notificación recibida:', req.body);

    try {
        const { data, type } = req.body; // Extrae el objeto data y el tipo de notificación
        const paymentId = data.id; // Accede al ID del pago desde el objeto data
        const eventId = req.query.id_url; // Extrae el ID del evento desde los query params
        console.log('[POST] /notifications - ID de pago recibido:', paymentId);
        console.log('[POST] /notifications - ID del evento recibido:', eventId);
        console.log('[POST] /notifications - Tipo de notificación recibido:', type);
        res.status(200).send("Notification received"); //puse esta porqueria directamente aca y me dio positivo
        // Verifica que el tipo de notificación es 'payment'
    } catch (error) {
        console.error('[POST] /notifications - Error al procesar la notificación:', error);
        return res.status(500).json({ message: 'Error interno al procesar la notificación' });
    }
});

export default router;
