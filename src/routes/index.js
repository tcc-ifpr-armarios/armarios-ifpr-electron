const express = require('express');
const router = express.Router();
const localizacaoController = require('../controllers/localizacaoController');

// Rotas para Localizacao
const localizacaoService = require('../service/localizacaoService');
router.post('/localizacoes', localizacaoService.inserir);
router.get('/localizacoes', localizacaoService.buscarTodos);
router.get('/localizacoes/:id', localizacaoService.buscarUnicoPorId);
router.put('/localizacoes/:id', localizacaoService.atualizar);
router.delete('/localizacoes/:id', localizacaoService.excluir);

// rotas para estudante
const estudanteController = require('../service/estudanteService');

// Rotas para Estudante
router.post('/estudantes', estudanteController.inserir);
router.get('/estudantes', estudanteController.buscarTodos);
router.get('/estudantes/:id', estudanteController.buscarUnicoPorId);
router.get('/estudantes/:id', estudanteController.buscarUnicoPorRa);
router.put('/estudantes/:id', estudanteController.atualizar);
router.delete('/estudantes/:id', estudanteController.excluir);

router.get('/teste', (req, res) => {
  res.send('Teste OK');
});

module.exports = router;
