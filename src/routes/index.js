const express = require('express');
const router = express.Router();
const localizacaoController = require('../controllers/localizacaoController');

// Rotas para Localizacao
router.post('/localizacoes', localizacaoController.createLocalizacao);
router.get('/localizacoes', localizacaoController.getAllLocalizacoes);
router.get('/localizacoes/:id', localizacaoController.getLocalizacaoById);
router.put('/localizacoes/:id', localizacaoController.updateLocalizacao);
router.delete('/localizacoes/:id', localizacaoController.deleteLocalizacao);

module.exports = router;
