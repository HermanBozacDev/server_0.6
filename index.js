//CONFIGURACION GLOBAL
import { appConfig, transporter, options } from './config.js';
import { configureCors } from './middlewares/corsConfig.js';
import { verifyToken } from './config.js';
import { SECRET_KEY } from './config.js';
import connectDB from './config/database.js';
//RUTAS
import notificationRoutes from './routes/notificationRoutes.js';
import successRoutes from './routes/successRoutes.js';
import qrRoutes from './routes/qrRoutes.js';
import pendingRoutes from './routes/pendingRoutes.js';
import failureRoutes from './routes/failureRoutes.js';
import preferenceRoutes from './routes/preferenceRoutes.js';// Endpoint para registrar usuarios
import registerRoutes from './routes/registerRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import panelRoutes from './routes/panelProductorRoutes.js'
//SERVICIOS
import express from "express";
//DATABASES
connectDB();
//CONSTANTES
const app = express();
const port = appConfig.port;
const client = appConfig.mercadoPago;
console.log(client)
//APPS
app.use(express.json());
app.use(configureCors());
app.use('/api/notifications', notificationRoutes);
app.use('/api/success', successRoutes);
app.use('/api/display-qr', qrRoutes);
app.use('/api/pending', pendingRoutes);
app.use('/api/failure', failureRoutes);
app.use('/api/create_preference', preferenceRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/login',loginRoutes);
app.use('/api/panelAdminEvento', panelRoutes);
//PUERTO
app.listen(3000, () => {console.log('Servidor escuchando en el puerto 3000');});
