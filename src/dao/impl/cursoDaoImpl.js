const Curso = require('../../models/curso');
const MensagemUtil = require('../../utils/mensagemUtil');
const { Op } = require('sequelize');

class CursoDaoImpl extends CursoDao {
  async atualizar(curso) {
    try {
      const [numAffectedRows] = await Curso.update(
        {
          nome: curso.nome,
          ativo: curso.ativo
        },
        { where: { id: curso.id } }
      );
      return numAffectedRows;
    } catch (error) {
      console.log(error);
      throw new Error(MensagemUtil.CURSO_ATUALIZACAO_ERRO_PADRAO);
    }
  }

  async buscarTodos() {
    try {
      return await Curso.findAll();
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_CURSO);
    }
  }

  async buscarTodosAtivos() {
    try {
      return await Curso.findAll({
        where: { ativo: true },
        order: [['nome', 'ASC']]
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_CURSO);
    }
  }

  async buscarUnicoPorId(idCurso) {
    try {
      return await Curso.findByPk(idCurso);
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_CURSO);
    }
  }

  async buscarUnicoPorNomeExato(nome) {
    try {
      return await Curso.findOne({
        where: { nome }
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_CURSO);
    }
  }

  async buscarUnicoPorNomeExatoComIdDiferente(nome, idCurso) {
    try {
      return await Curso.findOne({
        where: {
          nome,
          id: { [Op.not]: idCurso }
        }
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_CURSO);
    }
  }

  async excluir(curso) {
    try {
      const deleted = await Curso.destroy({
        where: { id: curso.id }
      });
      return deleted;
    } catch (error) {
      throw new Error(MensagemUtil.CURSO_EXCLUSAO_ERRO_PADRAO);
    }
  }

  async inserir(curso) {
    try {
      const novoCurso = await Curso.create(curso);
      return novoCurso;
    } catch (error) {
      console.log(error);
      throw new Error(MensagemUtil.CURSO_INSERCAO_ERRO_PADRAO);
    }
  }
}

module.exports = CursoDaoImpl;
