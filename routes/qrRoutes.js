// routes/qrRoutes.js

import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
    const { data } = req.query;
    res.set('Content-Type', 'image/png');
    return res.send(Buffer.from(data, 'base64'));
});

export default router;

