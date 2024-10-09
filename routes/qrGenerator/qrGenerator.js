// qrCodeService.js
import express from 'express';
import QRCode from 'qrcode';

const router = express.Router();

router.post("/", async (req, res) => {
    const ticketData = req.body;

    try {
        const qrCodeImageUrl = await QRCode.toDataURL(JSON.stringify(ticketData));
        res.status(200).json({ qrCodeImageUrl });
    } catch (error) {
        console.error("Error generando el código QR:", error);
        res.status(500).json({ error: "Error generando el código QR" });
    }
});

export default router;
