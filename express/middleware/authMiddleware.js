import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Acceso denegado'); // No se proporcionó un token

  jwt.verify(token, 'az_AZ', (err, user) => {
      if (err) return res.status(403).send('Token no válido');
      req.user = user; // Almacena los datos del usuario decodificados en req
      next();
  });
};