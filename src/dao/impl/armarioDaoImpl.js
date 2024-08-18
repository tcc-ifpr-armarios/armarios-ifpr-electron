const Armario = require('../../models/armario');
const ArmarioDao = require('../armarioDao');
const MensagemUtil = require('../../utils/MensagemUtil');
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

  async buscarTodosPorIdLocalizacao(idLocalizacao) {
    const armarios = await Armario.findAll({
      where: { idLocalizacao: idLocalizacao }
    });
    return armarios;
  }
}


module.exports = ArmarioDaoImpl;