const Localizacao = require('../../models/localizacao');
const LocalizacaoDao = require('../localizacaoDao');
const MensagemUtil = require('../../utils/MensagemUtil');
const { Op } = require('sequelize');

class LocalizacaoDaoImpl extends LocalizacaoDao {
  async atualizar(localizacao) {
    try {
      const atualizado = await Localizacao.update(
        {
          descricao: localizacao.descricao,
          ativo: localizacao.ativo
        },
        { where: { id: localizacao.id } }
      );
      return atualizado;
    } catch (error) {
      console.log(error);
      throw new Error(MensagemUtil.LOCALIZACAO_ATUALIZACAO_ERRO_PADRAO);
    }
  }

  async buscarAtivos() {
    try {
      return await Localizacao.findAll({
        where: { ativo: true },
        order: [['descricao', 'ASC']]
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_LOCALIZACAO);
    }
  }

  async buscarTodos() {
    try {
      return await Localizacao.findAll({
        order: [['descricao', 'ASC']]
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_LOCALIZACAO);
    }
  }

  async buscarTodosPaginado(numeroPagina, itensPorPagina) {
    const deslocamento = (numeroPagina - 1) * itensPorPagina;

    try {
      const { count, rows } = await Localizacao.findAndCountAll({
        limit: itensPorPagina,
        offset: deslocamento,
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
      throw new Error(MensagemUtil.ERRO_BUSCAR_LOCALIZACAO);
    }
  }

  async buscarUnicoPorDescricaoExata(descricao) {
    const resultado = await Localizacao.findOne({
      where: {
        descricao: descricao
      }
    });
    return resultado;
  }
  async buscarUnicoPorDescricaoExataComIdDiferente(descricao, idLocalizacao) {
    const resultado = await Localizacao.findOne({
      where: {
        descricao: descricao,
        id: { [Op.not]: idLocalizacao },
      }
    });
  }

  async excluir(localizacao) {
    try {
      const deleted = await Localizacao.destroy({
        where: { id: localizacao.id }
      });
      return deleted;
    } catch (error) {
      throw new Error(MensagemUtil.LOCALIZACAO_EXCLUSAO_ERRO_PADRAO);
    }
  }


  async inserir(localizacao) {
    try {
      const novaLocalizacao = await Localizacao.create(localizacao);
      return novaLocalizacao;
    } catch (error) {
      console.log(error.errors);
      if (error.name === 'SequelizeUniqueConstraintError' && error.parent && error.parent.code === '23505') {
        throw new Error('Descrição duplicada');
      }
      throw new Error('Erro ao criar localização');
    }
  }
}


module.exports = LocalizacaoDaoImpl;