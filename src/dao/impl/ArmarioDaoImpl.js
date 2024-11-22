const Armario = require('../../models/Armario');
const ArmarioDao = require('../ArmarioDao');
const MensagemUtil = require('../../utils/mensagemUtil');
const { Op } = require('sequelize');

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
}


module.exports = ArmarioDaoImpl;