//SERVICIOS
import express from "express";
import { configureCors } from './middlewares/corsConfig.js';
import QRCode from 'qrcode';
import { appConfig, transporter } from './config.js';
//RUTAS
import notificationRoutes from './routes/notificationRoutes.js';
import successRoutes from './routes/successRoutes.js';
import qrRoutes from './routes/qrRoutes.js'; 
import pendingRoutes from './routes/pendingRoutes.js';
import failureRoutes from './routes/failureRoutes.js';
import preferenceRoutes from './routes/preferenceRoutes.js';

import https from 'https';
import fs from 'fs';



import bcrypt from 'bcrypt';
import productorUser from './models/productorUser.js'
import mongoose from 'mongoose';

// Conexión a la base de datos 'itproductores' sin opciones deprecadas
mongoose.connect('mongodb://localhost:27017/itproductores')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));





const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/imperioticket.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/imperioticket.com/fullchain.pem')
};






//CONSTANTES
const app = express();
const port = appConfig.port;
const client = appConfig.mercadoPago;
console.log(client)

app.use(express.json());
app.use(configureCors());
app.use('/api/notifications', notificationRoutes);
app.use('/api/success', successRoutes);
app.use('/api/display-qr', qrRoutes);
app.use('/api/pending', pendingRoutes);
app.use('/api/failure', failureRoutes);
app.use('/api/create_preference', preferenceRoutes);

// Endpoint para registrar usuarios
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await productorUser.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Cifrar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = new productorUser({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
});


// Endpoint para login de usuarios
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar al usuario por su username
    const user = await productorUser.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si la contraseña es correcta
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    res.status(200).json({ message: 'Login exitoso' });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
