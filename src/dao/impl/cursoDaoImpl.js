const Curso = require('../../models/curso');
<<<<<<< HEAD
const CursoDao = require('../cursoDao');

class CursoDaoImpl extends CursoDao {
  async atualizar(nome, ativo, id){
    try {
      const updated = await Curso.update(
        { nome, ativo },
        { where: { id } }
      );

      if (updated) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError' && error.parent && error.parent.code === '23505') {
        throw new Error('Nome Duplicado');
      }
      throw new Error('Erro ao atualizar curso');
    }
  }

  buscarTodosAtivos() {
    // Implementação do método
  }

  async buscarTodos(pageNumber, limitNumber) {
    const offset = (pageNumber - 1) * limitNumber;

    try {
      const { count, rows } = await Curso.findAndCountAll({
        limit: limitNumber,
        offset: offset,
        order: [['nome', 'ASC']]
      });

      return { count, rows };
    } catch (error) {
      throw new Error('Erro ao buscar cursos paginadas');
    }
  }


  buscarUnicoPorId(idCurso) {
    try {
        const curso = Curso.findByPk(idCurso);
        return curso;
    } catch (error) {
        throw new Error('Erro ao buscar curso por ID');
    }
  }

  buscarUnicoPorNomeExato(nome) {
    // Implementação do método
  }

  buscarUnicoPorNomeExatoComIdDiferente(nome, idCurso) {
    // Implementação do método
  }

  async excluir(curso) {
    const id = curso;
    try {
        const deleted = await Curso.destroy({
            where: { id }
          });

        if (deleted) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw new Error('Erro ao excluir Curso');
    }
  }


=======
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

<<<<<<< HEAD

module.exports = CursoDaoImpl;
