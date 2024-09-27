// routes/failureRoutes.js
import express from 'express';

const router = express.Router();

/**
 * GET /failure
 * Maneja las transacciones fallidas y muestra un mensaje de error al usuario
 */
router.get('/', (req, res) => {
    console.log('[GET] /failure - Solicitud recibida');

    // Extraer datos de la consulta
    const { collection_id, collection_status, payment_id, status, external_reference, merchant_order_id } = req.query;

    // Log de los datos de la transacción fallida
    console.log('[GET] /failure - Datos de transacción fallida:', {
        collection_id, 
        collection_status, 
        payment_id, 
        status, 
        external_reference, 
        merchant_order_id
    });

    // Enviar una respuesta o redirigir a una página de fallo en el frontend
    res.send("Hubo un problema con tu transacción. Por favor, intenta nuevamente.");

    // Si deseas redirigir después de enviar la respuesta, descomenta la siguiente línea:
    // console.log('[GET] /failure - Redirigiendo al frontend de fallo');
    // res.redirect("http://147.79.107.178/failure");
});

export default router;
