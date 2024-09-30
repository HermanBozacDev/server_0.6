import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import { MercadoPagoConfig } from 'mercadopago';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// Definir las constantes en un solo módulo
export const appConfig = {
    port: 3000,
    idempotencyKey: uuidv4(),
    mercadoPago: new MercadoPagoConfig({
        accessToken: 'APP_USR-3208588231811361-091423-58ab2b5fd537c43af8c128413d6d9e4f-1990229297',
        x-integrator-id: 'dev_24c65fb163bf11ea96500242ac130004',
        options: {
            timeout: 5000,
        }
    })
};

console.log('appConfig:', appConfig);

// Configuración de Nodemailer
export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'martinhermanbozac@gmail.com',
        pass: 'uyru mphn ihxu heqg',
    },
});

console.log('Nodemailer transporter configurado.');



// Certificados SSL
export const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/imperioticket.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/imperioticket.com/fullchain.pem')
};

console.log('Certificados SSL cargados.');

// Definir SECRET_KEY en el mismo script
export const SECRET_KEY = process.env.SECRET_KEY || 'clave1234';
console.log('SECRET_KEY:', SECRET_KEY);

// Verificación del token usando SECRET_KEY
export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No se proporcionó un token' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token no válido o expirado' });
    }
};

console.log('verifyToken middleware definido.');

// Conexión a base de datos 
export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/itproductores');
        console.log('Conectado a MongoDB');
    } catch (err) {
        console.error('Error al conectar a MongoDB', err);
        process.exit(1); // Salir del proceso si no se puede conectar
    }
};

console.log('connectDB función definida.');
