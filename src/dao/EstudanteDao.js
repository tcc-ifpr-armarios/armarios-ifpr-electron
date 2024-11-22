const Estudante = require('../models/Estudante'); // Substitua pelo caminho correto para o modelo Estudante

class EstudanteDao {
  async atualizar(estudante) {
    throw new Error('Método atualizar() deve ser implementado');
  }

  async buscarAtivos() {
    throw new Error('Método buscarAtivos() deve ser implementado');
  }

  async buscarTodos() {
    throw new Error('Método buscarTodos() deve ser implementado');
  }

  async buscarTodosPorIdCurso(idCurso) {
    throw new Error('Método buscarTodosPorIdCurso() deve ser implementado');
  }

  async buscarTodosPorNome(nome) {
    throw new Error('Método buscarTodosPorNome() deve ser implementado');
  }

  async buscarUnicoPorEmail(email) {
    throw new Error('Método buscarUnicoPorEmail() deve ser implementado');
  }

  async buscarUnicoPorId(id) {
    throw new Error('Método buscarUnicoPorId() deve ser implementado');
  }

  async buscarUnicoPorRa(ra) {
    throw new Error('Método buscarUnicoPorRa() deve ser implementado');
  }

  async buscarUnicoPorRaComIdDiferente(ra, id) {
    throw new Error('Método buscarUnicoPorRaComIdDiferente() deve ser implementado');
  }

  async excluir(estudante) {
    throw new Error('Método excluir() deve ser implementado');
  }

  async inserir(estudante) {
    throw new Error('Método inserir() deve ser implementado');
  }

  async buscarEstudantesPorRa(ra) {
    throw new Error('Método buscarEstudantesPorRa() deve ser implementado');
  }

  async quantidadeEstudantesAtivos() {
    throw new Error('Método quantidadeEstudantesAtivos() deve ser implementado');
  }
  buscarTodosPaginado(numeroPagina, itensPorPagina) {
    throw new Error('Método buscarTodosPaginado() deve ser implementado');
  }
}

module.exports = EstudanteDao;
