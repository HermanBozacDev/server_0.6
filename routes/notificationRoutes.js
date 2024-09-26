import express from 'express';

const router = express.Router();

router.post("/", (req, res) => {
    const notification = req.body;

    // Maneja la notificación aquí (por ejemplo, guarda en la base de datos o actualiza el estado de la transacción)
    console.log("Notificación recibida:", notification);

    // Responde a Mercado Pago con un 200 para confirmar que recibiste la notificación
    res.status(200).send("Notification received");
});

export default router;

