class CursoDao {
    // Os métodos são definidos, mas lançam exceções para garantir que sejam implementados
    atualizar(curso) {
      throw new Error('Método atualizar() deve ser implementado');
    }
  
    buscarTodos() {
      throw new Error('Método buscarTodos() deve ser implementado');
    }
  
    buscarTodosAtivos() {
      throw new Error('Método buscarTodosAtivos() deve ser implementado');
    }
  
    buscarUnicoPorId(idCurso) {
      throw new Error('Método buscarUnicoPorId() deve ser implementado');
    }
  
    buscarUnicoPorNomeExato(nome) {
      throw new Error('Método buscarUnicoPorNomeExato() deve ser implementado');
    }
  
    buscarUnicoPorNomeExatoComIdDiferente(nome, idCurso) {
      throw new Error('Método buscarUnicoPorNomeExatoComIdDiferente() deve ser implementado');
    }
  
    excluir(curso) {
      throw new Error('Método excluir() deve ser implementado');
    }
  
    inserir(curso) {
      throw new Error('Método inserir() deve ser implementado');
    }
  }
  
  module.exports = CursoDao;
  