// routes/pendingRoutes.js

import express from 'express';

const router = express.Router();

/**
 * GET /pending
 * Ruta para manejar transacciones pendientes.
 */
router.get("/", (req, res) => {
    console.log("[GET] /pending - Solicitud recibida");

    const { collection_id, collection_status, payment_id, status, external_reference, merchant_order_id } = req.query;

    // Procesar los datos de la transacción pendiente
    console.log("[GET] /pending - Datos de transacción pendiente:", {
        collection_id, collection_status, payment_id, status, external_reference, merchant_order_id
    });

    // Enviar una respuesta o redirigir a una página de transacción pendiente en el frontend
    res.send("Tu transacción está pendiente. Te notificaremos cuando sea procesada.");
    console.log("[GET] /pending - Redirigiendo a página de transacción pendiente");
    res.redirect("http://147.79.107.178/pending");
});

export default router;
