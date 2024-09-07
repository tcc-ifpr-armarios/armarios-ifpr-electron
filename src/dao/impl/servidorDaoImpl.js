const Servidor = require('../../models/servidor');
const MensagemUtil = require('../../utils/mensagemUtil');
const { Op } = require('sequelize');

class ServidorDaoImpl extends ServidorDao {
  async buscarTodos() {
    try {
      return await Servidor.findAll({
        order: [['nome', 'ASC']]
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_SERVIDOR);
    }
  }

  async buscarUnicoPorEmail(email) {
    try {
      return await Servidor.findOne({
        where: { email }
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_SERVIDOR);
    }
  }

  async buscarUnicoPorEmailOuSiape(emailOuSiape) {
    try {
      return await Servidor.findOne({
        where: {
          [Op.or]: [
            { email: emailOuSiape },
            { siape: emailOuSiape }
          ]
        }
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_SERVIDOR);
    }
  }

  async buscarUnicoPorId(id) {
    try {
      return await Servidor.findByPk(id);
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_SERVIDOR);
    }
  }

  async atualizar(servidor) {
    try {
      const [numAffectedRows] = await Servidor.update(
        {
          nome: servidor.nome,
          email: servidor.email,
          siape: servidor.siape,
          ativo: servidor.ativo
        },
        { where: { id: servidor.id } }
      );
      return numAffectedRows;
    } catch (error) {
      console.log(error);
      throw new Error(MensagemUtil.SERVIDOR_ATUALIZACAO_ERRO_PADRAO);
    }
  }

  async excluir(servidor) {
    try {
      const deleted = await Servidor.destroy({
        where: { id: servidor.id }
      });
      return deleted;
    } catch (error) {
      throw new Error(MensagemUtil.SERVIDOR_EXCLUSAO_ERRO_PADRAO);
    }
  }

  async inserir(servidor) {
    try {
      const novoServidor = await Servidor.create(servidor);
      return novoServidor;
    } catch (error) {
      console.log(error);
      throw new Error(MensagemUtil.SERVIDOR_INSERCAO_ERRO_PADRAO);
    }
  }
}

module.exports = ServidorDaoImpl;
