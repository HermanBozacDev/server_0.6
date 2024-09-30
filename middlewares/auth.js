import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js'; // Asegúrate de tener este archivo de configuración

// Middleware para verificar el token de superadmin
export const verifySuperAdminToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del header
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido' });
    }
    
    // Verificar el rol del usuario (asumiendo que se incluye en el token)
    if (decoded.role !== 'superadmin') {
      return res.status(403).json({ message: 'No autorizado' });
    }

    req.user = decoded; // Guardar información del usuario en la solicitud
    next(); // Llamar al siguiente middleware o ruta
  });
};

// Middleware para verificar el token de productor
export const verifyProducerToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido' });
    }
    
    // Verificar el rol del usuario
    if (decoded.role !== 'producer') {
      return res.status(403).json({ message: 'No autorizado' });
    }

    req.user = decoded;
    next();
  });
};
