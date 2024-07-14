const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  console.log("Token: ", token, req.path);
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
  
    // Injeta o ID do usuário na requisição
    req.userId = decoded.userId;
    next();
  });
};

module.exports = authMiddleware;
