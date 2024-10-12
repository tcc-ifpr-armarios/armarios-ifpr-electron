const express = require('express');
const jwt = require('jsonwebtoken');
const MensagemUtil = require('../utils/mensagemUtil');
const { verificaAdm } = require('../service/loginServico');
const criaEstudanteCronos = require("../service/cronosServico");
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

module.exports = router;
