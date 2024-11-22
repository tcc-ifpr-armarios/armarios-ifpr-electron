const Estudante = require('../../models/Estudante');
const MensagemUtil = require('../../utils/mensagemUtil');
const EstudanteDao = require('../EstudanteDao');
const { Op } = require('sequelize');

class EstudanteDaoImpl extends EstudanteDao {
  async atualizar(estudante) {
    try {
      const [updated] = await Estudante.update(
        {
          nome: estudante.nome,
          email: estudante.email,
          ra: estudante.ra,
          ativo: estudante.ativo,
          cursoId: estudante.cursoId,
        },
        { where: { id: estudante.id } }
      );
      if (updated === 0) {
        throw new Error(MensagemUtil.ESTUDANTE_ATUALIZACAO_ERRO_PADRAO);
      }
      return estudante;
    } catch (error) {
      console.log(error);
      throw new Error(MensagemUtil.ESTUDANTE_ATUALIZACAO_ERRO_PADRAO);
    }
  }

  async buscarAtivos() {
    try {
      return await Estudante.findAll({
        where: { ativo: true },
        order: [['nome', 'ASC']],
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_ESTUDANTE);
    }
  }

  async buscarTodos() {
    try {
      return await Estudante.findAll({
        order: [['nome', 'ASC']],
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_ESTUDANTE);
    }
  }

  async buscarTodosPorIdCurso(idCurso) {
    try {
      return await Estudante.findAll({
        where: { cursoId: idCurso },
        order: [['nome', 'ASC']],
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_ESTUDANTE);
    }
  }

  async buscarTodosPorNome(nome) {
    try {
      return await Estudante.findAll({
        where: { nome },
        order: [['nome', 'ASC']],
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_ESTUDANTE);
    }
  }

  async buscarUnicoPorEmail(email) {
    try {
      return await Estudante.findOne({
        where: { email },
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_ESTUDANTE);
    }
  }

  async buscarUnicoPorId(idEstudante) {
    try {
      return await Estudante.findByPk(idEstudante);
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_ESTUDANTE);
    }
  }

  async buscarUnicoPorRa(ra) {
    try {
      return await Estudante.findOne({
        where: { ra },
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_ESTUDANTE);
    }
  }

  async buscarUnicoPorRaComIdDiferente(ra, idEstudante) {
    try {
      return await Estudante.findOne({
        where: {
          ra,
          id: { [Op.ne]: idEstudante },
        },
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_ESTUDANTE);
    }
  }

  async excluir(estudante) {
    try {
      const deleted = await Estudante.destroy({
        where: { id: estudante.id },
      });
      if (deleted === 0) {
        throw new Error(MensagemUtil.ESTUDANTE_EXCLUSAO_ERRO_PADRAO);
      }
      return estudante;
    } catch (error) {
      throw new Error(MensagemUtil.ESTUDANTE_EXCLUSAO_ERRO_PADRAO);
    }
  }

  async inserir(estudante) {
    try {
      return await Estudante.create(estudante);
    } catch (error) {
      console.log(error);
      throw new Error(MensagemUtil.ESTUDANTE_INSERCAO_ERRO_PADRAO);
    }
  }

  async buscarEstudantesPorRa(ra) {
    try {
      return await Estudante.findAll({
        where: { ra },
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_ESTUDANTE);
    }
  }

  async quantidadeEstudantesAtivos() {
    try {
      const count = await Estudante.count({
        where: { ativo: true },
      });
      return count;
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_ESTUDANTE);
    }
  }

  async buscarTodosPaginado(numeroPagina, itensPorPagina) {
    try {
      const { count, rows } = await Estudante.findAndCountAll({
        limit: itensPorPagina,
        offset: (numeroPagina - 1) * itensPorPagina,
        order: [['nome', 'ASC']],
      });
      return { count, rows };
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_ESTUDANTE);
    }
  }
}

module.exports = EstudanteDaoImpl;
