// routes/qrRoutes.js

import express from 'express';

const router = express.Router();

/**
 * GET /qr
 * Genera y devuelve una imagen QR en formato PNG basada en datos recibidos en la consulta.
 * El dato se espera en formato base64.
 */
router.get("/", (req, res) => {
    const { data } = req.query;

    if (!data) {
        console.error("[GET] /qr - No se proporcionó el parámetro 'data'");
        return res.status(400).send("Falta el parámetro 'data'");
    }

    try {
        // Establecer el tipo de contenido como imagen PNG
        res.set('Content-Type', 'image/png');

        // Convertir los datos base64 a un buffer y devolver la imagen
        console.log("[GET] /qr - Generando imagen QR a partir de los datos recibidos.");
        return res.send(Buffer.from(data, 'base64'));
    } catch (error) {
        console.error("[GET] /qr - Error al generar la imagen QR:", error);
        return res.status(500).send("Error al generar la imagen QR");
    }
});

export default router;
