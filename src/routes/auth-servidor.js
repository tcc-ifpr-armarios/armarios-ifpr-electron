const express = require('express');
const jwt = require('jsonwebtoken');
const MensagemUtil = require('../utils/mensagemUtil');
const { verificaAdm } = require('../service/loginService');
require('dotenv').config();

const router = express.Router();

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
  try {
      const resultado = await verificaAdm(siape, password);
      if (resultado.sucesso) {
          res.status(200).json({ token: resultado.token }); 
      } else {
          res.status(401).json({ error: resultado.mensagem }); 
      }
  } catch (error) {
    res.status(500).json({ error: MensagemUtil.INTERNAL_SERVER_ERROR }); 
  }
});

module.exports = router;
