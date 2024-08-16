const Localizacao = require('../../models/localizacao');
const LocalizacaoDao = require('../localizacaoDao');

class LocalizacaoDaoImpl extends LocalizacaoDao {
  async atualizar(descricao, ativo, id){
    try {
      const updated = await Localizacao.update(
        { descricao, ativo },
        { where: { id } }
      );
      
      if (updated) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError' && error.parent && error.parent.code === '23505') {
        throw new Error('Descrição duplicada');
      }
      throw new Error('Erro ao atualizar localização');
    }
  }

  buscarAtivos() {
    // Implementação do método
  }

  async buscarTodos(pageNumber, limitNumber) {
    const offset = (pageNumber - 1) * limitNumber;
    
    try {
      const { count, rows } = await Localizacao.findAndCountAll({
        limit: limitNumber,
        offset: offset,
        order: [['descricao', 'ASC']]
      });
      
      return { count, rows };
    } catch (error) {
      throw new Error('Erro ao buscar localizações paginadas');
    }
  }


  buscarUnicoPorId(idLocalizacao) {
    try {
        const localizacao = Localizacao.findByPk(idLocalizacao);
        return localizacao;
    } catch (error) {
        throw new Error('Erro ao buscar localização por ID');        
    }
  }

  buscarUnicoPorDescricaoExata(descricao) {
    // Implementação do método
  }

  buscarUnicoPorDescricaoExataComIdDiferente(descricao, idLocalizacao) {
    // Implementação do método
  }

  async excluir(localizacao) {
    const id = localizacao;
    try {
        const deleted = await Localizacao.destroy({
            where: { id }
          });
        
        if (deleted) {
            return true;
        } else {
            return false;
        }
    } catch (error) {        
        throw new Error('Erro ao excluir localização');       
    }
  }

  
  async inserir(localizacao) {
    try {
      const novaLocalizacao = await Localizacao.create(localizacao);
      return novaLocalizacao;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError' && error.parent && error.parent.code === '23505') {
        throw new Error('Descrição duplicada');
      }
      throw new Error('Erro ao criar localização');
    }
  }
}


module.exports = LocalizacaoDaoImpl;