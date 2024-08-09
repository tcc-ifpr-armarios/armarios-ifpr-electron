const Estudante = require('../models/estudante');
const externalization = require('../externalization/request');

// Cria um novo estudante
const createEstudante = async (req, res) => {
  console.log(externalization.successCreatingStudent);
  try {
    const { ra, nome, sobrenome, email, ativo, telefone, senha } = req.body;
    const estudante = await Estudante.create({ ra, nome, sobrenome, email, ativo, telefone, senha });
    res.status(201).json({ message: externalization.successCreatingStudent });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError' && error.parent && error.parent.code === '23505') {
      // Erro de chave duplicada, no PostgreSQL esse código é 23505 (SequelizeUniqueConstraintError)
      res.status(400).json({ error: externalization.duplicateDescription });
    }
    console.error('Erro ao criar estudante:', error);
    res.status(500).json({ error: externalization.errorCreatingStudent });
  }
};

// Retorna todos os estudantes
const getAllEstudantes = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const offset = (pageNumber - 1) * limitNumber;

  try {
    const { count, rows } = await Estudante.findAndCountAll({
      limit: limitNumber,
      offset: offset,
      order: [['descricao', 'ASC']]
    });
    
    const totalPages = Math.ceil(count / limitNumber);

    res.status(200).json({
      data: rows,
      pagination: {
        totalItems: count,
        totalPages: totalPages,
        currentPage: pageNumber,
        itemsPerPage: limitNumber
      }
    });
  } catch (error) {
    res.status(500).json({ error: externalization.errorFetchingStudents });
  }
};

// Retorna um estudante por ID
const getEstudanteById = async (req, res) => {
  try {
    const { id } = req.params;
    const estudante = await Estudante.findByPk(id);
    if (estudante) {
      res.status(200).json(estudante);
    } else {
      res.status(404).json({ error: 'Estudante não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estudante' });
  }
};

// Atualiza um estudante por ID
const updateEstudante = async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, ativo } = req.body;
    const [updated] = await Estudante.update({ descricao, ativo }, {
      where: { id }
    });

    if (updated) {
      const updatedEstudante = await Estudante.findByPk(id);
      res.status(200).json({ message: externalization.successEditingStudent });
    } else {
      res.status(404).json({ error: externalization.notFoundStudent });
    }
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError' && error.parent && error.parent.code === '23505') {
      // Erro de chave duplicada, no PostgreSQL esse código é 23505 (SequelizeUniqueConstraintError)
      res.status(400).json({ error: externalization.duplicateDescription });
    }
    res.status(500).json({ error: externalization.errorEditingStudent });
  }
};

// Deleta uma estudante por ID
const deleteEstudante = async (req, res) => {
  console.log(req.params);
  try {
    const { id } = req.params;
    const deleted = await Estudante.destroy({
      where: { id }
    });
    
    if (deleted) {
      res.status(200).json({ message: externalization.successDeletingStudent });
    } else {
      res.status(404).json({ error: externalization.notFoundStudent });
    }
  } catch (error) {
    res.status(500).json({ error: externalization.errorDeletingStudent });
  }
};

module.exports = {
  createEstudante,
  getAllEstudantes,
  getEstudanteById,
  updateEstudante,
  deleteEstudante
};
