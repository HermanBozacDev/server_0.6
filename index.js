//CONFIGURACION GLOBAL
import { appConfig, transporter, options } from './config.js';
import { configureCors } from './middlewares/corsConfig.js';
import { verifyToken } from './config.js';
import { SECRET_KEY } from './config.js';
import connectDB from './database/database.js';
//RUTAS
import notificationRoutes from './routes/notificationRoutes.js';
import successRoutes from './routes/successRoutes.js';
import qrRoutes from './routes/qrRoutes.js';
import eventosRoutes from './routes/eventosRoutes.js';
import panelRoutes from './routes/panelProductorRoutes.js';

//RUTAS DE MERCADO PAGO
import preferenceRoutes from './routes/preferenceRoutes.js';
import pendingRoutes from './routes/pendingRoutes.js';
import failureRoutes from './routes/failureRoutes.js';
import successRoutes from './routes/successRoutes.js';

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
app.use('/api/display-qr', qrRoutes);
app.use('/api/panelAdminEvento', panelRoutes);
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




//PUERTO
app.listen(3000, () => {console.log('Servidor escuchando en el puerto 3000');});
