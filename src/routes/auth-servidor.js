const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const servidor = require('../models/servidor');
require('dotenv').config();

const router = express.Router();

const secret = process.env.JWT_SECRET; // Substitua por uma variável de ambiente segura

// Registro de usuário
// router.post('/register', async (req, res) => {
//   const { siape, password } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const servidor = await servidor.create({ siape, password: hashedPassword });
//     res.status(201).json({ message: 'Usuário registrado com sucesso' });
//   } catch (error) {
//     res.status(500).json({ error: 'Erro ao registrar usuário' });
//   }
// });

// Login de servidor
router.post('/login', async (req, res) => {
  const { siape, password } = req.body;

  console.log("SIAPE: ");
  try {
    const user = await servidor.findOne({ where: { siape } });
    if (user && await bcrypt.compare(password, user.senha)) {
      const token = jwt.sign({ servidorId: user.id, servidorNome: user.nome}, secret, { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

module.exports = router;
