// dao/EstudanteDao.js
class EstudanteDao {
  inserir(estudante) {
    throw new Error('Método inserir() deve ser implementado');
  }

  buscarTodos(pageNumber, limitNumber) {
    throw new Error('Método buscarTodos() deve ser implementado');
  }

  buscarUnicoPorId(id) {
    throw new Error('Método buscarUnicoPorId() deve ser implementado');
  }

  buscarUnicoPorRa(ra) {
    throw new Error('Método buscarUnicoPorRa() deve ser implementado');
  }

  atualizar(estudante) {
    throw new Error('Método atualizar() deve ser implementado');
  }

  excluir(ra) {
    throw new Error('Método excluir() deve ser implementado');
  }
}

module.exports = EstudanteDao;
