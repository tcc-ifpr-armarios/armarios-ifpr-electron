const Curso = require('../../models/curso');
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

  
  async inserir(curso) {
    try {
      const novoCurso = await Curso.create(curso);
      return novoCurso;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError' && error.parent && error.parent.code === '23505') {
        throw new Error('Nome Duplicado');
      }
      throw new Error('Erro ao criar curso');
    }
  }
}


module.exports = CursoDaoImpl;