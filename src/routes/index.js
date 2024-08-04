const express = require('express');
const router = express.Router();
// Rotas para Localizacao
const localizacaoController = require('../controllers/localizacaoController');

router.post('/localizacoes', localizacaoController.createLocalizacao);
router.get('/localizacoes', localizacaoController.getAllLocalizacoes);
router.get('/localizacoes/:id', localizacaoController.getLocalizacaoById);
router.put('/localizacoes/:id', localizacaoController.updateLocalizacao);
router.delete('/localizacoes/:id', localizacaoController.deleteLocalizacao);

// rotas para estudante
const estudanteController = require('../controllers/estudanteController');

router.post('/estudantes', estudanteController.createEstudante);
router.get('/estudantes', estudanteController.getAllEstudantes);
router.get('/estudante/:ra', estudanteController.getEstudanteByRa);
router.put('/estudantes/:ra', estudanteController.updateEstudante);
router.delete('/estudantes/:ra', estudanteController.deleteEstudante);

router.get('/teste', (req, res) => {
  res.send('Teste OK');
});

module.exports = router;
