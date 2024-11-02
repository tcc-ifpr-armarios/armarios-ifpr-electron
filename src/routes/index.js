const express = require('express');
const router = express.Router();

// Rotas para Localizacao
const LocalizacaoControle = require('../controles/LocalizacaoControle');
router.post('/localizacoes', LocalizacaoControle.inserir);
router.get('/localizacoes', LocalizacaoControle.buscarTodosPaginado);
router.get('/localizacoes/:id', LocalizacaoControle.buscarUnicoPorId);
router.put('/localizacoes/:id', LocalizacaoControle.atualizar);
router.delete('/localizacoes/:id', LocalizacaoControle.excluir);

// rotas para estudante
const estudanteControle = require('../controles/estudanteControle');
router.post('/estudantes', estudanteControle.inserir);
router.get('/estudantes', estudanteControle.buscarTodosPaginado);
router.get('/estudante/:nome', estudanteControle.buscarTodosPorNome);
router.put('/estudantes/:ra', estudanteControle.atualizar);
router.delete('/estudantes/:ra', estudanteControle.excluir);

const servidorControle = require('../controles/servidorControle')
router.post('/servidores', servidorControle.inserir);
router.get('/servidores', servidorControle.buscarTodosPaginado);
router.get('/servidores:id', servidorControle.buscarUnicoPorId);
router.put('/servidores/:id', servidorControle.atualizar);
router.delete('/servidores/:id', servidorControle.excluir);




router.get('/teste', (req, res) => {
  res.send('Teste OK');
});

module.exports = router;
