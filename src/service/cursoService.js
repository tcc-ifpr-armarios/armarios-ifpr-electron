const CursoDaoImpl = require('../dao/impl/cursoDaoImpl');
const externalization = require('../externalization/request');
const cursoDao = new CursoDaoImpl();

const inserir = async (req, res) => {
  try {
    const { nome, ativo } = req.body;
    const curso = await cursoDao.inserir({ nome, ativo });
    res.status(201).json({ message: externalization.successCreatingCourse, data: curso });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError' && error.parent && error.parent.code === '23505') {
      // Erro de chave duplicada, no PostgreSQL esse código é 23505 (SequelizeUniqueConstraintError)
      res.status(400).json({ error: externalization.duplicateName });
    }
    console.error('Erro ao criar curso:', error);
    res.status(500).json({ error: externalization.errorCreatingCourse });
  }
};

const buscarTodos = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  try {
    const { count, rows } = await cursoDao.buscarTodos(pageNumber, limitNumber);
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
    console.error('Erro ao buscar localizações:', error);
    res.status(500).json({ error: externalization.errorFetchingCourses });
  }
};

const excluir = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await cursoDao.excluir(id);
    
    if (deleted) {
      res.status(200).json({ message: externalization.successDeletingCourse });
    } else {
      res.status(404).json({ error: externalization.notFoundCourse });
    }
  } catch (error) {
    res.status(500).json({ error: externalization.errorDeletingCourse });
  }
};

const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, ativo } = req.body;
    const updated = await cursoDao.atualizar( nome, ativo, id);  

    if (updated) {
      res.status(200).json({ message: externalization.successEditingCourse });
    } else {
      res.status(404).json({ error: externalization.notFoundCourse });
    }
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError' && error.parent && error.parent.code === '23505') {
      // Erro de chave duplicada, no PostgreSQL esse código é 23505 (SequelizeUniqueConstraintError)
      res.status(400).json({ error: externalization.duplicateName });
    }
    res.status(500).json({ error: externalization.errorEditingCourse });
  }
}

const buscarUnicoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const curso = await cursoDao.buscarUnicoPorId(id);
    if (curso) {
      res.status(200).json(curso);
    } else {
      res.status(404).json({ error: externalization.notFoundCourse });
    }
  } catch (error) {
    res.status(500).json({ error: externalization.errorFetchingCourse });
  }
};



module.exports = { inserir, buscarTodos, excluir, atualizar, buscarUnicoPorId };