class ServidorDao {
    // Os métodos são definidos, mas lançam exceções para garantir que sejam implementados
    buscarTodosPaginado(numeroPagina, itensPorPagina) {
      throw new Error('Método buscarTodosPaginado() deve ser implementado');
    }
  
    buscarUnicoPorEmail(email) {
      throw new Error('Método buscarUnicoPorEmail() deve ser implementado');
    }
  
    buscarUnicoPorEmailOuSiape(emailOuSiape) {
      throw new Error('Método buscarUnicoPorEmailOuSiape() deve ser implementado');
    }
  
    buscarUnicoPorId(id) {
      throw new Error('Método buscarUnicoPorId() deve ser implementado');
    }
  
    atualizar(servidor) {
      throw new Error('Método atualizar() deve ser implementado');
    }
  
    excluir(servidor) {
      throw new Error('Método excluir() deve ser implementado');
    }
  
    inserir(servidor) {
      throw new Error('Método inserir() deve ser implementado');
    }
  }
  
  module.exports = ServidorDao;
  