import express from 'express';
import { MercadoPagoConfig, Payment } from 'mercadopago';

// Inicializa el cliente
const client = new MercadoPagoConfig({ accessToken: 'YOUR_ACCESS_TOKEN' });
const payment = new Payment(client);

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
        console.log('[POST] /notifications - ID recibido:', paymentId);
        console.log('[POST] /notifications - Tipo de notificación recibido:', type);

        // Verifica que el tipo de notificación es 'payment'
        if (type === 'payment') {
            console.log('[POST] /notifications - Notificación de tipo "payment" con ID:', paymentId);

            try {
                // Usa el SDK de Mercado Pago para obtener los detalles del pago
                const paymentDetails = await payment.get(paymentId); // Cambiado a `payment.get(paymentId)`
                console.log('[POST] /notifications - Detalles del pago obtenidos:', paymentDetails);

                // Aquí puedes agregar la lógica que necesites para procesar el pago
                // Por ejemplo, actualizar tu base de datos con el estado del pago

                // Responde indicando que la notificación fue procesada correctamente
                return res.status(200).json({ message: 'Notificación procesada correctamente' });
            } catch (error) {
                console.error('[POST] /notifications - Error al obtener los detalles del pago:', error);
                return res.status(500).json({ message: 'Error al obtener los detalles del pago' });
            }
        } else {
            console.log('[POST] /notifications - Tipo de notificación no soportada:', type);
            return res.status(400).json({ message: 'Tipo de notificación no soportada' });
        }
    } catch (error) {
        console.error('[POST] /notifications - Error al procesar la notificación:', error);
        return res.status(500).json({ message: 'Error interno al procesar la notificación' });
    }
});

export default router;
