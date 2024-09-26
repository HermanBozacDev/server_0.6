import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import { MercadoPagoConfig } from "mercadopago";
import fs from 'fs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';



// Definir las constantes en un solo módulo
export const appConfig = {
    port: 3000,
    idempotencyKey: uuidv4(),
    mercadoPago: new MercadoPagoConfig({
        accessToken: process.env.ACCESS_TOKEN ||
            'APP_USR-4182250944919230-092518-bebf3d003288ed02c9d00ab78bfede6a-1208420997',
        options: {
            timeout: 5000,
        }
    })
};

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

// Función para modificar los items
export const modifyItems = (items) => {
    return items.map(item => {
        if (!item.id) {
            console.warn("Producto sin ID. Asignando ID predeterminado.");
            item.id = "default-id";
        }
        if (!item.description) {
            console.warn("Producto sin descripción. Asignando descripción predeterminada.");
            item.description = "Descripción del producto por defecto";
        }
        return item;
    });
};


export const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/imperioticket.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/imperioticket.com/fullchain.pem')
};





// Definir SECRET_KEY en el mismo script
export const SECRET_KEY = process.env.SECRET_KEY || 'clave1234';

// Verificación del token usando SECRET_KEY
export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No se proporcionó un token' });
    }

    try {
        // Usar SECRET_KEY en lugar de duplicar la clave
        const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token no válido o expirado' });
    }
};



export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/itproductores');
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('Error al conectar a MongoDB', err);
    process.exit(1); // Salir del proceso si no se puede conectar
  }
};





