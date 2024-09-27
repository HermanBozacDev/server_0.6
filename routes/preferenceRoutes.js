// controllers/paymentController.js

import { Preference } from "mercadopago";
import express from 'express';
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
            items: items.map(item => ({
              id: item.id,
              title: item.title,
              quantity: item.quantity,
              unit_price: item.unit_price,
              picture_url: item.picture_url ,
              description: item.description ,
            })),
            payer: {
              name: payer.name,
              surname: payer.surname,
              email: payer.email,
              phone: payer.phone,
              address: payer.address,
            },
            back_urls,
            auto_return: auto_return,
            payment_methods: {
              excluded_payment_methods: payment_methods.excluded_payment_methods,
              excluded_payment_types: payment_methods.excluded_payment_types,
              installments: payment_methods.installments,
            },
            external_reference: external_reference || uuidv4(),
          };

        // Log de datos del request
        console.log("[POST] /payment - Request body for creating preference:", paymentData);

        const headers = {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            //'Authorization': 'Bearer APP_USR-7156168157781283-xxx-xxx-1392481428',
            'x-integrator-id': 'dev_24c65fb163bf11ea96500242ac130004',
        };

        const preference = new Preference(client); // Verifica que `client` esté correctamente definido
        const result = await preference.create({ body: paymentData, headers });

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
