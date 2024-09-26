// routes/pendingRoutes.js

import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
    console.log("GET request received at /pending");
    const { collection_id, collection_status, payment_id, status, external_reference, merchant_order_id } = req.query;

    // Aquí puedes procesar los datos de la transacción pendiente
    console.log("Datos de transacción pendiente:", {
        collection_id, collection_status, payment_id, status, external_reference, merchant_order_id
    });

    // Enviar una respuesta o redirigir a una página de transacción pendiente en el frontend
    res.send("Tu transacción está pendiente. Te notificaremos cuando sea procesada.");
    res.redirect("http://147.79.107.178/pending");
});

export default router;

