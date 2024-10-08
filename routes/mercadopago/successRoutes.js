// routes/successRoutes.js

import express from 'express';
import QRCode from 'qrcode';
import { transporter } from '../../config.js'; // Asegúrate de que el transporter esté exportado correctamente en config.js
import Venta from '../../models/ventas.js'; // Modelo para guardar la información de la venta en la base de datos
//tengo que aplicar logica. cantidad de items vendidos. para saber cuantos qr generar
const router = express.Router();

router.get("/", async (req, res) => {
    console.log("GET request received at /success");
    const { collection_id, external_reference } = req.query;

    // Generar información del ticket
    const ticketData = {
        id: collection_id,
        event: "Nombre del evento",
        date: new Date().toISOString(),
        external_reference,
    };

    try {
        // Generar el código QR a partir de los datos del ticket
        const qrCodeImageUrl = await QRCode.toDataURL(JSON.stringify(ticketData));

        // Crear una nueva entrada en la colección de ventas
        const nuevaVenta = new Venta({
            qrId: collection_id,  // ID único para el QR
            email: 'hermanbozac28@gmail.com', // Cambiar esto al email del cliente real
            cantidad: 1, // Asignar la cantidad adecuada
            fechaConcierto: new Date(), // Cambiar a la fecha real del concierto
            informacionPago: {
                collection_id,
                external_reference,
                // Agregar más detalles sobre el pago si es necesario
            },
            title: "Nombre del Evento", // Cambiar al título real del evento
            quantity: 1, // Asignar la cantidad adecuada
            unit_price: 100, // Cambiar al precio unitario real
            itemId: "ID_del_item", // Cambiar al ID real del ítem
            description: "Descripción del ítem" // Cambiar a la descripción real
        });

        // Guardar la venta en la base de datos
        await nuevaVenta.save();

        // Enviar el código QR por correo electrónico
        await transporter.sendMail({
            from: '"Nombre del Remitente" <martinhermanbozac@gmail.com>', // Cambiar el nombre y correo del remitente
            to: 'hermanbozac28@gmail.com', // Cambiar al correo del destinatario
            subject: 'Código QR de la Transacción',
            text: 'Adjunto encontrarás el código QR de tu transacción.',
            attachments: [
                {
                    filename: 'qrcode.png',
                    content: qrCodeImageUrl.split(',')[1], // Obtener solo el base64 sin el prefijo
                    encoding: 'base64'
                }
            ]
        });

        console.log("Correo enviado con el código QR");

        // Redirigir a la página de detalles del evento en el frontend
        res.redirect(`https://www.imperioticket.com/EventDetails`);
    } catch (error) {
        console.error("Error generando el código QR:", error);
        return res.status(500).send("Error generando el código QR");
    }
});

export default router;
