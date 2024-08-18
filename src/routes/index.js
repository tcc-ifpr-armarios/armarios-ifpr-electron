const express = require('express');
const router = express.Router();
// Rotas para Localizacao
const LocalizacaoControle = require('../controllers/LocalizacaoControle');
router.post('/localizacoes', LocalizacaoControle.inserir);
router.get('/localizacoes', LocalizacaoControle.buscarTodos);
router.get('/localizacoes/:id', LocalizacaoControle.buscarUnicoPorId);
router.put('/localizacoes/:id', LocalizacaoControle.atualizar);
router.delete('/localizacoes/:id', LocalizacaoControle.excluir);

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
