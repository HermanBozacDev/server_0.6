import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import { MercadoPagoConfig } from "mercadopago";

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

