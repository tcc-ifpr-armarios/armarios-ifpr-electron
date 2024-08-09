const express = require('express');
const router = express.Router();
const localizacaoController = require('../controllers/localizacaoController');
const estudanteController = require('../controllers/estudanteController');

// Rotas para Localizacao
router.post('/localizacoes', localizacaoController.createLocalizacao);
router.get('/localizacoes', localizacaoController.getAllLocalizacoes);
router.get('/localizacoes/:id', localizacaoController.getLocalizacaoById);
router.put('/localizacoes/:id', localizacaoController.updateLocalizacao);
router.delete('/localizacoes/:id', localizacaoController.deleteLocalizacao);

// Rotas para Estudante
router.post('/estudantes', estudanteController.createEstudante);
router.get('/estudantes', estudanteController.getAllEstudantes);
router.get('/estudantes/:id', estudanteController.getEstudanteById);
router.put('/estudantes/:id', estudanteController.updateEstudante);
router.delete('/estudantes/:id', estudanteController.deleteEstudante);

router.get('/teste', (req, res) => {
  res.send('Teste OK');
});

module.exports = router;
