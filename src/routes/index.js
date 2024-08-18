const express = require('express');
const router = express.Router();
// Rotas para Localizacao
const localizacaoServico = require('../service/LocalizacaoServico');
router.post('/localizacoes', localizacaoServico.inserir);
router.get('/localizacoes', localizacaoServico.buscarTodos);
router.get('/localizacoes/:id', localizacaoServico.buscarUnicoPorId);
router.put('/localizacoes/:id', localizacaoServico.atualizar);
router.delete('/localizacoes/:id', localizacaoServico.excluir);

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
