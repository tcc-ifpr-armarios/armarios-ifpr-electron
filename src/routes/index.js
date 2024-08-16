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

router.post('/cursos', cursoController.createCurso);
router.get('/cursos', cursoController.getCursos);
router.get('/cursos/:id', cursoController.getCursoById);
router.put('/cursos/:id', cursoController.updateCurso);
router.delete('/cursos/:id', cursoController.deleteCurso);


router.get('/teste', (req, res) => {
  res.send('Teste OK');
});

module.exports = router;
