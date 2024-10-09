// emailService.js
import express from 'express';
import { transporter } from '../../../config.js'; // Configuración del transporter

const router = express.Router();

router.post("/enviarEmail", async (req, res) => {
    const { to, subject, text, attachments } = req.body;

    try {
        await transporter.sendMail({
            from: '"Nombre del Remitente" <remitente@dominio.com>',
            to,
            subject,
            text,
            attachments
        });
        res.status(200).json({ message: "Correo enviado exitosamente" });
    } catch (error) {
        console.error("Error enviando el correo:", error);
        res.status(500).json({ error: "Error enviando el correo" });
    }
});

export default router;

