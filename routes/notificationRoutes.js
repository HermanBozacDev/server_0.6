import express from 'express';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import crypto from 'crypto';

// Inicializa el cliente de Mercado Pago
const client = new MercadoPagoConfig({ accessToken: 'APP_USR-4182250944919230-092518-bebf3d003288ed02c9d00ab78bfede6a-1208420997' });
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
        const eventId = req.query.id_url; // Extrae el ID del evento desde los query params
        console.log('[POST] /notifications - ID de pago recibido:', paymentId);
        console.log('[POST] /notifications - ID del evento recibido:', eventId);
        console.log('[POST] /notifications - Tipo de notificación recibido:', type);

        // Verifica que el tipo de notificación es 'payment'
        if (type === 'payment') {
            console.log('[POST] /notifications - Notificación de tipo "payment" con ID:', paymentId);

            // Extrae los encabezados necesarios para la validación
            const xSignature = req.headers['x-signature'];
            const xRequestId = req.headers['x-request-id'];

            // Separando el x-signature en partes
            const parts = xSignature.split(',');
            let ts = null;
            let hash = null;

            // Iterando sobre los valores para obtener ts y v1
            for (const part of parts) {
                const [key, value] = part.split('=').map(item => item.trim());
                if (key === 'ts') {
                    ts = value;
                } else if (key === 'v1') {
                    hash = value;
                }
            }

            // Obtén la clave secreta para tu aplicación
            const secret = 'd37ca9470386dbc05f31780c62dee59237bb0a93fb4800b06a1ed69ac25454de'; // Reemplaza con tu clave secreta

            // Genera la cadena de manifest
            const manifest = `id:${paymentId};request-id:${xRequestId};ts:${ts};`;

            // Crea la firma HMAC
            const sha = crypto.createHmac('sha256', secret).update(manifest).digest('hex');

            // Compara la firma generada con la recibida
            if (sha === hash) {
                // La verificación HMAC pasó
                console.log('[POST] /notifications - HMAC verification passed');

                try {
                    // Usa el SDK de Mercado Pago para obtener los detalles del pago
                    const paymentDetails = await payment.get(paymentId);
                    console.log('[POST] /notifications - Detalles del pago obtenidos:', paymentDetails);

                    // Aquí puedes agregar la lógica que necesites para procesar el pago
                    // Por ejemplo, actualizar tu base de datos con el estado del pago

                    // Responde indicando que la notificación fue procesada correctamente
                    return res.status(200).json({ message: 'Notificación procesada correctamente' });
                } catch (error) {
                    console.error('[POST] /notifications - Error al obtener los detalles del pago:', error.response ? error.response.data : error);
                    return res.status(500).json({ message: 'Error al obtener los detalles del pago' });
                }
            } else {
                // La verificación HMAC falló
                console.error('[POST] /notifications - HMAC verification failed');
                return res.status(401).json({ message: 'Invalid signature' });
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
