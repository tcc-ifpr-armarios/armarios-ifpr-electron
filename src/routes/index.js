const express = require('express');
const router = express.Router();
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

const cursoController = require('../controllers/cursoController');
const cursoService = require('../service/cursoService');

router.post('/cursos', cursoService.inserir);
router.get('/cursos', cursoService.buscarTodos);
router.get('/cursos/:id', cursoService.buscarUnicoPorId);
router.put('/cursos/:id', cursoService.atualizar);
router.delete('/cursos/:id', cursoService.excluir);


router.get('/teste', (req, res) => {
  res.send('Teste OK');
});

module.exports = router;
