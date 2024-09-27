// controllers/paymentController.js

import express from 'express';
import { v4 as uuidv4 } from 'uuid'; // Asegúrate de importar uuid para la referencia externa
import { appConfig, modifyItems } from '../config.js';

const router = express.Router();
const client = appConfig.mercadoPago;

/**
 * POST /payment
 * Crea una preferencia de pago utilizando los datos proporcionados en el cuerpo de la solicitud.
 */
router.post("/", async (req, res) => {
    try {
        const { items, payer, back_urls, payment_methods, auto_return, external_reference } = req.body;

        // Verificar que los datos requeridos están presentes
        if (!items || !payer || !back_urls) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
        }

        // Modificar los ítems según la configuración
        const modifiedItems = modifyItems(items);

        // Datos de la preferencia de pago
        const paymentData = {
            items: modifiedItems.map(item => ({
                id: item.id,
                title: item.title,
                quantity: item.quantity,
                unit_price: item.unit_price,
                picture_url: item.picture_url,
                description: item.description,
            })),
            payer: {
                name: payer.name,
                surname: payer.surname,
                email: payer.email,
                phone: payer.phone,
                address: payer.address,
            },
            back_urls: back_urls,
            auto_return: auto_return || 'approved',
            payment_methods: {
                excluded_payment_methods: payment_methods.excluded_payment_methods || [],
                excluded_payment_types: payment_methods.excluded_payment_types || [],
                installments: payment_methods.installments || 1,
            },
            external_reference: external_reference || uuidv4(),
        };

        // Log de datos del request
        console.log("[POST] /payment - Request body for creating preference:", paymentData);

        // Crear la preferencia en Mercado Pago
        const result = await client.preferences.create(paymentData);

        // Log de éxito
        console.log("[POST] /payment - Preference created successfully:", result.body);

        // Responder con el ID de la preferencia creada
        res.json({ id: result.body.id });
    } catch (error) {
        console.error("[POST] /payment - Error al crear la preferencia:", error);
        if (error.response) console.error("[POST] /payment - Response data:", error.response.data);
        res.status(500).json({ error: "Error al crear la preferencia" });
    }
});

export default router;
