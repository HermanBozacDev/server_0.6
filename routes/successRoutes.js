// routes/successRoutes.js
//hola actualize en git

import express from 'express';
import QRCode from 'qrcode';
import { transporter } from '../config.js'; // Asegúrate de que el transporter esté exportado en config.js
import Venta from '../models/ventas.js';
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
        // Generar el QR
        const qrCodeImageUrl = await QRCode.toDataURL(JSON.stringify(ticketData));

        // Crear la entrada en la colección de ventas
        const nuevaVenta = new Venta({
            qrId: collection_id,  // ID único para el QR
            email: 'hermanbozac28@gmail.com', // Cambia esto al email del cliente
            cantidad: 1, // Asigna la cantidad adecuada
            fechaConcierto: new Date(), // Cambia esto a la fecha del concierto
            informacionPago: {
                collection_id,
                external_reference,
                // Aquí puedes agregar más detalles sobre el pago si es necesario
            },
            title: "Nombre del Evento", // Cambia esto al título real del evento
            quantity: 1, // Asigna la cantidad adecuada
            unit_price: 100, // Cambia esto al precio unitario real
            itemId: "ID_del_item", // Cambia esto al ID del ítem real
            description: "Descripción del ítem" // Cambia esto a la descripción real
        });

        // Guardar la venta en la base de datos
        await nuevaVenta.save();


	    
        // Enviar el QR por correo electrónico
        await transporter.sendMail({
            from: '"Nombre del Remitente" <martinhermanbozac@gmail.com>', // Cambia esto al nombre y correo del remitente
            to: 'hermanbozac28@gmail.com', // Cambia esto al correo del destinatario
            subject: 'Código QR de la Transacción',
            text: 'Adjunto encontrarás el código QR de tu transacción.',
            attachments: [
                {
                    filename: 'qrcode.png',
                    content: qrCodeImageUrl.split(',')[1], // Obtén solo el base64 sin el prefijo
                    encoding: 'base64'
                }
            ]
        });
        console.log("estoy apunto de redirigir")
//	res.json({ qrCode: qrCodeImageUrl, message: "QR generado correctamente" });
	
//	res.redirect(`https://www.imperioticket.com/TicketDetail?qrCode=${encodeURIComponent(qrCodeImageUrl)}`);
	res.redirect(`https://www.imperioticket.com/EventDetails`);
//	res.redirect(`https://www.imperioticket.com/ticket?qrCode=${encodeURIComponent(qrCodeImageUrl)}`);



        // Redirigir a una ruta que maneje la visualización del QR
//        const base64Data = qrCodeImageUrl.replace(/^data:image\/png;base64,/, "");
//      const qrUrl = `http://www.imperioticket.com/api/display-qr?data=${encodeURIComponent(base64Data)}`;
//	console.log("Redirigiendo a:", qrUrl);
//
//        return res.redirect(qrUrl);
    } catch (error) {
        console.error("Error generando el código QR:", error);
        return res.status(500).send("Error generando el código QR");
    }
});

export default router;

