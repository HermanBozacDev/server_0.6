// controllers/paymentController.js
import { Preference } from "mercadopago";
import express from 'express';
import {appConfig, modifyItems } from '../config.js';
const router = express.Router();
const client = appConfig.mercadoPago;
router.post("/", async (req, res) => {
    try {
        const { items, back_urls, auto_return, payment_methods, external_reference } = req.body;
        const modifiedItems = modifyItems(items);
        const paymentData = {
            items: modifiedItems,
            back_urls: {
                success: back_urls.success || "http://www.imperioticket.com/api/success",
                failure: back_urls.failure || "http://www.imperioticket.com/api/failure",
                pending: back_urls.pending || "http://www.imperioticket.com/api/pending"},
            auto_return: auto_return || "approved",
            payment_methods: payment_methods || {
                excluded_payment_methods: [{ id: "visa" }],
                excluded_payment_types: [{ id: "atm" }],
                installments: 6  },
            external_reference: external_reference || "mi-referencia-external-12345",
            notification_url: "http://www.imperioticket.com/api/notifications"};
        console.log("Request body for creating preference:", paymentData);
        const headers = {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization': 'Bearer APP_USR-7156168157781283-xxx-xxx-1392481428',
            'x-integrator-id': 'dev_24c65fb163bf11ea96500242ac130004',};
        const preference = new Preference(client); // Asegúrate de que `client` esté definido
        const result = await preference.create({ body: paymentData, headers });
        console.log("Preference created successfully:", result);
        res.json({ id: result.id });
    } catch (error) {
        console.error("Error al crear la preferencia:", error);
        if (error.response) console.error("Response data:", error.response.data);
        res.status(500).json({ error: "Error al crear la preferencia" });
    }
});

export default router;

