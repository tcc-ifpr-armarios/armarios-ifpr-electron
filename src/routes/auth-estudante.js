const express = require('express');
const jwt = require('jsonwebtoken');
const MensagemUtil = require('../utils/mensagemUtil');
const { verificaAdm, verificaEstudante } = require('../service/LoginServico');
const criaEstudanteCronos = require("../service/CronosServico");
require('dotenv').config();

const router = express.Router();

router.post('/create/login', async (req, res) => {
    console.log(req.body)
    const { ra, password, telefone } = req.body;
    try {
        const resultado = await criaEstudanteCronos(ra, password, telefone);
        console.log(resultado)
        if (resultado.sucesso) {
            res.status(201).json({ message: resultado.mensagem });
        } else if(resultado.cadastrado) {
            res.status(200).json({ message: resultado.mensagem });
        } else {
            res.status(401).json({ error: resultado.mensagem });
        }
    } catch (error) {
        res.status(500).json({ error: MensagemUtil.INTERNAL_SERVER_ERROR });
    }
});

router.post('/student/login', async (req, res) => {
    const { ra, password } = req.body;
    try {
        const resultado = await verificaEstudante(ra, password);
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
