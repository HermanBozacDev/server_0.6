// routes/preferenceRoutes.js

import { Preference } from "mercadopago";
import express from 'express';
import { appConfig} from '../../config.js';

const router = express.Router();
const client = appConfig.mercadoPago;

/**
 * POST /payment
 * Crea una preferencia de pago utilizando los datos proporcionados en el cuerpo de la solicitud.
 */
router.post("/", async (req, res) => {
    try {
        const { items, back_urls, auto_return, payment_methods, external_reference, notification_url } = req.body;
        // Datos de la preferencia de pago
        const paymentData = {
            items: items,
            back_urls: {
                success: back_urls.success,
                failure: back_urls.failure,
                pending: back_urls.pending,
            },
            auto_return: auto_return,
            payment_methods: payment_methods,
            external_reference: external_reference,
            notification_url: notification_url,
        };

        // Log de datos del request 'Authorization': 'Bearer APP_USR-3208588231811361-091423-58ab2b5fd537c43af8c128413d6d9e4f-1990229297','Content-Type': 'application/json',  'Cache-Control': 'no-cache', 
        console.log("[POST] /payment - Request body for creating preference:", paymentData);



        const preference = new Preference(client); // Verifica que `client` esté correctamente definido
        const result = await preference.create({body: paymentData});


        // Log de éxito
        console.log("[POST] /payment - Preference created successfully:", result);

        // Responder con el ID de la preferencia creada
        res.json({ id: result.id });
    } catch (error) {
        console.error("[POST] /payment - Error al crear la preferencia:", error);
        if (error.response) console.error("[POST] /payment - Response data:", error.response.data);
        res.status(500).json({ error: "Error al crear la preferencia" });
    }
});

export default router;
