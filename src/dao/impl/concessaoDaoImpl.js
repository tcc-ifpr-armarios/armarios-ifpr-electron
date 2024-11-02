const Concessao = require('../../models/concessao');
const MensagemUtil = require('../../utils/mensagemUtil');
const { Op } = require('sequelize');

class ConcessaoDaoImpl extends ConcessaoDao {
  async atualizar(concessao) {
    try {
      const [numAffectedRows] = await Concessao.update(
        {
          /* Inclua os campos que precisam ser atualizados aqui */
        },
        { where: { id: concessao.id } }
      );
      return numAffectedRows;
    } catch (error) {
      console.log(error);
      throw new Error(MensagemUtil.CONCESSAO_ATUALIZACAO_ERRO_PADRAO);
    }
  }

  async buscarAtivoPorSiapeDoServidor(siape) {
    try {
      return await Concessao.findOne({
        where: { siape, ativo: true }
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_CONCESSAO);
    }
  }

  async buscarAtivoPorIdArmario(idArmario) {
    try {
      return await Concessao.findOne({
        where: { idArmario, ativo: true }
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_CONCESSAO);
    }
  }

  async buscarAtivosPorIdLocalizacao(idLocalizacao) {
    try {
      return await Concessao.findAll({
        where: { idLocalizacao, ativo: true }
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_CONCESSAO);
    }
  }

  async buscarTodos() {
    try {
      return await Concessao.findAll();
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_CONCESSAO);
    }
  }

  async buscarTodosPorIdLocalizacao(idLocalizacao) {
    try {
      return await Concessao.findAll({
        where: { idLocalizacao }
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_CONCESSAO);
    }
  }

  async buscarTodosPorSiapeDoServidor(siape) {
    try {
      return await Concessao.findAll({
        where: { siape }
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_CONCESSAO);
    }
  }

  async buscarTodosPorIdArmario(idArmario) {
    try {
      return await Concessao.findAll({
        where: { idArmario }
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_CONCESSAO);
    }
  }

  async buscarUnicoPorId(identificador) {
    try {
      return await Concessao.findByPk(identificador);
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_CONCESSAO);
    }
  }

  async excluir(concessao) {
    try {
      const deleted = await Concessao.destroy({
        where: { id: concessao.id }
      });
      return deleted;
    } catch (error) {
      throw new Error(MensagemUtil.CONCESSAO_EXCLUSAO_ERRO_PADRAO);
    }
  }

  async inserir(concessao) {
    try {
      const novaConcessao = await Concessao.create(concessao);
      return novaConcessao;
    } catch (error) {
      console.log(error);
      throw new Error(MensagemUtil.CONCESSAO_INSERCAO_ERRO_PADRAO);
    }
  }

  async quantidadeConcessoesAtivas() {
    try {
      const count = await Concessao.count({
        where: { ativo: true }
      });
      return count;
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_CONCESSAO);
    }
  }
}

module.exports = ConcessaoDaoImpl;
