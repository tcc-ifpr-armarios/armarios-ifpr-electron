class ConcessaoDao {
    // Os métodos são definidos, mas lançam exceções para garantir que sejam implementados
    atualizar(concessao) {
      throw new Error('Método atualizar() deve ser implementado');
    }
  
    buscarAtivoPorSiapeDoServidor(ra) {
      throw new Error('Método buscarAtivoPorSiapeDoServidor() deve ser implementado');
    }
  
    buscarAtivoPorIdArmario(idArmario) {
      throw new Error('Método buscarAtivoPorIdArmario() deve ser implementado');
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
  
    buscarTodosPorSiapeDoServidor(siape) {
      throw new Error('Método buscarTodosPorSiapeDoServidor() deve ser implementado');
    }
  
    buscarTodosPorIdArmario(idArmario) {
      throw new Error('Método buscarTodosPorIdArmario() deve ser implementado');
    }
  
    buscarUnicoPorId(identificador) {
      throw new Error('Método buscarUnicoPorId() deve ser implementado');
    }
  
    excluir(concessao) {
      throw new Error('Método excluir() deve ser implementado');
    }
  
    inserir(concessao) {
      throw new Error('Método inserir() deve ser implementado');
    }
  
    quantidadeConcessoesAtivas() {
      throw new Error('Método quantidadeConcessoesAtivas() deve ser implementado');
    }
  }
  
  module.exports = ConcessaoDao;
  