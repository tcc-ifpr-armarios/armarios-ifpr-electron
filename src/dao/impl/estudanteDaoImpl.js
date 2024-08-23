// dao/impl/EstudanteDaoImpl.js
const Estudante = require('../../models/estudante');
const EstudanteDao = require('../EstudanteDao');

class EstudanteDaoImpl extends EstudanteDao {
  async inserir(estudante) {
    try {
      const novoEstudante = await Estudante.create(estudante);
      return novoEstudante;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError' && error.parent && error.parent.code === '23505') {
        throw new Error('E-mail duplicado');
      }
      throw new Error('Erro ao criar estudante');
    }
  }

  async buscarTodos(pageNumber, limitNumber) {
    const offset = (pageNumber - 1) * limitNumber;

    try {
      const { count, rows } = await Estudante.findAndCountAll({
        limit: limitNumber,
        offset: offset,
        order: [['nome', 'ASC']]
      });

      return { count, rows };
    } catch (error) {
      throw new Error('Erro ao buscar estudantes paginados');
    }
  }

  async buscarUnicoPorId(id) {
    try {
      const estudante = await Estudante.findByPk(id);
      return estudante;
    } catch (error) {
      throw new Error('Erro ao buscar estudante por ID');
    }
  }

  async buscarUnicoPorRa(ra) {
    try {
      const estudante = await Estudante.findOne({ where: { ra } });
      return estudante;
    } catch (error) {
      throw new Error('Erro ao buscar estudante por RA');
    }
  }

  async atualizar(estudante) {
    try {
      const estudanteDb = await Estudante.findByPk(estudante.ra);
      if (estudanteDb) {
        await estudanteDb.update(estudante);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error('Erro ao atualizar estudante');
    }
  }

  async excluir(ra) {
    try {
      const deleted = await Estudante.destroy({ where: { ra } });
      if (deleted) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error('Erro ao excluir estudante');
    }
  }
}

module.exports = EstudanteDaoImpl;
