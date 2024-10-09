//CONFIGURACION GLOBAL
import { appConfig, transporter, options } from './config.js';
import { configureCors } from './middlewares/corsConfig.js';
import { verifyToken, SECRET_KEY  } from './config.js';
import connectDB from './database/database.js';
//RUTAS
import notificationRoutes from './routes/notificationRoutes.js';
import eventosRoutes from      './routes/eventosRoutes.js';
import emailService from       './routes/emailService/emailService.js';

//RUTAS DE MERCADO PAGO
import preferenceRoutes from './routes/mercadopago/preferenceRoutes.js';
import pendingRoutes    from './routes/mercadopago/pendingRoutes.js';
import failureRoutes    from './routes/mercadopago/failureRoutes.js';
import successRoutes    from './routes/mercadopago/successRoutes.js';

//RUTAS DE PRODUCTORES
import productorRegister from './routes/productor/productorRegisterRoutes.js';
import productorLogin    from './routes/productor/productorLoginRoutes.js';
import productorUsers    from './routes/productor/productorUsersRoutes.js';
import productorDelete   from './routes/productor/productorDeleteRoutes.js';

//RUTAS DE LA ADMINISTRACION
import adminRegister from './routes/admin/adminRegisterRoutes.js';
import adminLogin    from './routes/admin/adminLoginRoutes.js';
import adminUsers    from './routes/admin/adminUsersRoutes.js';
import adminDelete   from './routes/admin/adminDeleteRoutes.js';


import uploads   from './routes/assets/assetsRoutes.js';
import uploadImage from './routes/assets/assetsRoutes.js';
//SERVICIOS
import express from "express";
import multer from 'multer';
import path from 'path';


//DATABASES
connectDB();
//CONSTANTES

const app = express();
const port = appConfig.port;

//APPS
app.use(express.json());
app.use(configureCors());
app.use('/api/notifications', notificationRoutes);
app.use('/api/eventos', eventosRoutes);

//RUTAS DE MERCADO PAGO
app.use('/api/create_preference', preferenceRoutes);
app.use('/api/pending', pendingRoutes);
app.use('/api/failure', failureRoutes);
app.use('/api/success', successRoutes);

//RUTAS DE PRODUCTORES
app.use('/api/productorRegister', productorRegister);
app.use('/api/productorLogin',productorLogin);
app.use('/api/productorUsers', productorUsers);
app.use('/api/productorDelete', productorDelete);

//RUTAS DE ADMINISTRACION
app.use('/api/adminRegister', adminRegister);
app.use('/api/adminLogin', adminLogin);
app.use('/api/adminUsers', adminUsers);
app.use('/api/adminDelete', adminDelete);

//RUTAS QR Y EMAIL
app.use('/api/emailService', emailService);


// Servir archivos estáticos desde el directorio 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/uploadImage', uploadImage);

//PUERTO
app.listen(3000, () => {console.log('Servidor escuchando en el puerto 3000');});
