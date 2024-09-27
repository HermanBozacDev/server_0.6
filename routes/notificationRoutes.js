// routes/notificationRoutes.js
import express from 'express';
import mercadopago from 'mercadopago'; // Asegúrate de que mercadopago esté instalado

const router = express.Router();

// Ruta para recibir las notificaciones de Mercado Pago
router.post('/', async (req, res) => {
    try {
        // Asegúrate de que la notificación se recibe correctamente
        console.log('Notificación recibida:', req.body);

        const { id, type } = req.body; // ID de la notificación

        // Verifica que el tipo de notificación es 'payment'
        if (type === 'payment') {
            // Usa el SDK de Mercado Pago para obtener los detalles del pago
            const payment = await mercadopago.payment.findById(id);
            console.log('Detalles del pago:', payment);

            // Aquí puedes procesar los detalles del pago, por ejemplo:
            // - Actualizar tu base de datos
            // - Enviar confirmaciones, etc.

            res.status(200).json({ message: 'Notificación procesada correctamente' });
        } else {
            res.status(400).json({ message: 'Tipo de notificación no soportada' });
        }
    } catch (error) {
        console.error('Error al procesar la notificación:', error);
        res.status(500).json({ message: 'Error interno al procesar la notificación' });
    }
});

export default router;


