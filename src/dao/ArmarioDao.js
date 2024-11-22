class ArmarioDao {
  // Os métodos são definidos, mas lançam exceções para garantir que sejam implementados
  atualizar(armario) {
    throw new Error('Método atualizar() deve ser implementado');
  }

  buscarAtivosPorIdLocalizacao(idLocalizacao) {
    throw new Error('Método buscarAtivosPorIdLocalizacao() deve ser implementado');
  }

  buscarTodos() {
    throw new Error('Método buscarTodos() deve ser implementado');
  }

  buscarTodosPorIdLocalizacao(idLocalizacao) {
    throw new Error('Método buscarTodosPorIdLocalizacao() deve ser implementado');
  }

  buscarTodosPorStatus(status) {
    throw new Error('Método buscarTodosPorStatus() deve ser implementado');
  }

  buscarTodosPaginado(numeroPagina, itensPorPagina) {
    throw new Error('Método buscarTodosPaginado() deve ser implementado');
  }

  buscarUnicoPorId(idArmario) {
    throw new Error('Método buscarUnicoPorId() deve ser implementado');
  }

  buscarUnicoPorNumeroELocalizacao(dLocalizacao, numero) {
    throw new Error('Método buscarUnicoPorNumeroELocalizacao() deve ser implementado');
  }

  buscarUnicoPorNumeroELocalizacaoComIdDiferente(idLocalizacao, numero, idArmario) {
    throw new Error('Método buscarUnicoPorNumeroELocalizacaoComIdDiferente() deve ser implementado');
  }

  excluir(armario) {
    throw new Error('Método excluir() deve ser implementado');
  }

  inserir(armario) {
    throw new Error('Método inserir() deve ser implementado');
  }

  buscarPorStatusIdLocalizacao(idLocalizacao, status) {
    throw new Error('Método buscarPorStatusIdLocalizacao() deve ser implementado');
  }

  quantidadeArmariosLivres() {
    throw new Error('Método quantidadeArmariosLivres() deve ser implementado');
  }

}

module.exports = ArmarioDao;
