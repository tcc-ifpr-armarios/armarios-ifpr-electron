class LocalizacaoDao {
  // Os métodos são definidos, mas lançam exceções para garantir que sejam implementados
  atualizar(localizacao) {
    throw new Error('Método atualizar() deve ser implementado');
  }

  buscarAtivos() {
    throw new Error('Método buscarAtivos() deve ser implementado');
  }

  buscarTodos() {
    throw new Error('Método buscarTodos() deve ser implementado');
  }

  buscarTodosPaginado(numeroPagina, itensPorPagina) {
    throw new Error('Método buscarTodosPaginado() deve ser implementado');
  }

  buscarUnicoPorId(idLocalizacao) {
    throw new Error('Método buscarUnicoPorId() deve ser implementado');
  }

  buscarUnicoPorDescricaoExata(descricao) {
    throw new Error('Método buscarUnicoPorDescricaoExata() deve ser implementado');
  }

  buscarUnicoPorDescricaoExataComIdDiferente(descricao, idLocalizacao) {
    throw new Error('Método buscarUnicoPorDescricaoExataComIdDiferente() deve ser implementado');
  }

  excluir(localizacao) {
    throw new Error('Método excluir() deve ser implementado');
  }

  inserir(localizacao) {
    throw new Error('Método inserir() deve ser implementado');
  }
}

module.exports = LocalizacaoDao;
