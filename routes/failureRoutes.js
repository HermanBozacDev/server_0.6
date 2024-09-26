// routes/failureRoutes.js
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    console.log("GET request received at /failure");
    const { collection_id, collection_status, payment_id, status, external_reference, merchant_order_id } = req.query;

    // Aquí puedes procesar los datos de la transacción fallida
    console.log("Datos de transacción fallida:", {
        collection_id, collection_status, payment_id, status, external_reference, merchant_order_id
    });

    // Enviar una respuesta o redirigir a una página de fallo en el frontend
    res.send("Hubo un problema con tu transacción. Por favor, intenta nuevamente.");
    // Descomentar la siguiente línea si deseas redirigir después de enviar una respuesta
    // res.redirect("http://147.79.107.178/failure");
});

export default router;

