// corsConfig.js
import cors from 'cors';

// Lista de orígenes permitidos
const allowedOrigins = ['https://www.imperioticket.com', 'https://imperioticket.com'];

// Configuración de CORS
export const configureCors = () => {
    return cors({
        origin: function (origin, callback) {
            // Permite la solicitud si el origen está en la lista o si no hay origen
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true, // Si necesitas enviar cookies o autenticación
        allowedHeaders: [
            'Content-Type',   // Necesario para solicitudes POST con JSON
            'Authorization',  // Si usas tokens de autenticación
            'x-integrator-id' // Header personalizado que estás enviando
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] // Métodos HTTP permitidos
    });
};
