const Armario = require('../../models/Armario');
const ArmarioDao = require('../ArmarioDao');
const MensagemUtil = require('../../utils/mensagemUtil');
const { Op } = require('sequelize');
const Curso = require("../../models/Curso");

class ArmarioDaoImpl extends ArmarioDao {
  async excluir(armario) {
    try {
      const deleted = await Armario.destroy({
        where: { id: armario.id }
      });
      return deleted;
    } catch (error) {
      throw new Error(MensagemUtil.ARMARIO_EXCLUSAO_ERRO_PADRAO);
    }
  }

  async inserir(armario) {
    try {
      const novoArmario = await Armario.create(armario);
      return novoArmario;
    } catch (error) {
      throw new Error(MensagemUtil.ARMARIO_INSERCAO_ERRO_PADRAO);
    }
  }

  async buscarTodosPorIdLocalizacao(id_localizacao) {
    const armarios = await Armario.findAll({
      where: { id_localizacao: id_localizacao }
    });
    return armarios;
  }

  async buscarTodos() {
    try {
      return await Armario.findAll();
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_ARMARIO);
    }
  }

  async buscarPorStatus(status) {
    try {
      return await Armario.findAll({
        where: { status: status },
        order: [['numero', 'ASC']]
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_ARMARIO);
    }
  }

  async buscarUnicoPorId(id) {
    try {
      return await Armario.findByPk(id);
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_ARMARIO);
    }
  }

  async buscarUnicoPorNumeroELocalizacaoComIdDiferente(id_localizacao, numero, id) {
    try {
      return await Armario.findOne({
        where: {
          id: { [Op.not]: id },
          numero: numero,
          id_localizacao: id_localizacao
        },
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_ARMARIO);
    }
  }

  async atualizar(armario) {
    try {
      const [numAffectedRows] = await Armario.update(
          {
            nome: armario.numero,
            ativo: armario.status,
            id_localizacao: armario.id_localizacao
          },
          { where: { id: armario.id } }
      );
      return armario;
    } catch (error) {
      throw new Error(MensagemUtil.ARMARIO_ATUALIZACAO_ERRO_PADRAO);
    }
  }

}


module.exports = ArmarioDaoImpl;