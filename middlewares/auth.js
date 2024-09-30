import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js'; // Asegúrate de tener este archivo de configuración

// Middleware para verificar el token de superadmin
export const verifySuperAdminToken = (req, res, next) => {
  console.log('[verifySuperAdminToken] Verificando el token de superadmin...');
  
  // Obtener el token del header de autorización
  const token = req.headers['authorization']?.split(' ')[1];
  console.log('[verifySuperAdminToken] Token recibido:', token);
  
  if (!token) {
    console.log('[verifySuperAdminToken] No se proporcionó token');
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  // Verificar el token con la clave secreta
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log('[verifySuperAdminToken] Token no válido:', err);
      return res.status(403).json({ message: 'Token no válido' });
    }

    // Log para ver qué se ha decodificado del token
    console.log('[verifySuperAdminToken] Token decodificado:', decoded);

    // Verificar el rol del usuario
    if (decoded.role !== 'superadmin') {
      console.log('[verifySuperAdminToken] Rol no autorizado:', decoded.role);
      return res.status(403).json({ message: 'No autorizado' });
    }

    // Log si todo sale bien
    console.log('[verifySuperAdminToken] Token verificado, acceso concedido');
    req.user = decoded; // Guardar información del usuario en la solicitud
    next(); // Llamar al siguiente middleware o ruta
  });
};

// Middleware para verificar el token de productor
export const verifyProducerToken = (req, res, next) => {
  console.log('[verifyProducerToken] Verificando el token de productor...');

  const token = req.headers['authorization']?.split(' ')[1];
  console.log('[verifyProducerToken] Token recibido:', token);
  
  if (!token) {
    console.log('[verifyProducerToken] No se proporcionó token');
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log('[verifyProducerToken] Token no válido:', err);
      return res.status(403).json({ message: 'Token no válido' });
    }

    // Log para ver qué se ha decodificado del token
    console.log('[verifyProducerToken] Token decodificado:', decoded);

    // Verificar el rol del usuario
    if (decoded.role !== 'producer') {
      console.log('[verifyProducerToken] Rol no autorizado:', decoded.role);
      return res.status(403).json({ message: 'No autorizado' });
    }

    // Log si todo sale bien
    console.log('[verifyProducerToken] Token verificado, acceso concedido');
    req.user = decoded;
    next();
  });
};
