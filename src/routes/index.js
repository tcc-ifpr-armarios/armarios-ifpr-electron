const express = require('express');
const router = express.Router();
const localizacaoController = require('../controllers/localizacaoController');
const estudanteController = require('../controllers/estudanteController');

// Rotas para Localizacao
const localizacaoService = require('../service/localizacaoService');
router.post('/localizacoes', localizacaoService.inserir);
router.get('/localizacoes', localizacaoService.buscarTodos);
router.get('/localizacoes/:id', localizacaoService.buscarUnicoPorId);
router.put('/localizacoes/:id', localizacaoService.atualizar);
router.delete('/localizacoes/:id', localizacaoService.excluir);

// rotas para estudante
const estudanteController = require('../controllers/estudanteController');

router.post('/estudantes', estudanteController.createEstudante);
router.get('/estudantes', estudanteController.getAllEstudantes);
router.get('/estudante/:ra', estudanteController.getEstudanteByRa);
router.put('/estudantes/:ra', estudanteController.updateEstudante);
router.delete('/estudantes/:ra', estudanteController.deleteEstudante);

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
