const EstudanteDaoImpl = require('../dao/impl/EstudanteDaoImpl');
const externalization = require('../externalization/request');
const estudanteDao = new EstudanteDaoImpl();

const inserir = async (req, res) => {
  try {
    const { ra, nome, sobrenome, email, ativo, telefone, senha } = req.body;
    const estudante = await estudanteDao.inserir({ ra, nome, sobrenome, email, ativo, telefone, senha });
    res.status(201).json({ message: externalization.successCreatingStudent, data: estudante });
  } catch (error) {
    if (error.message === 'E-mail duplicado') {
      res.status(400).json({ error: externalization.duplicateEmail });
    } else {
      console.error('Erro ao criar estudante:', error);
      res.status(500).json({ error: externalization.errorCreatingStudent });
    }
  }
};

const buscarTodos = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  try {
    const { count, rows } = await estudanteDao.buscarTodos(pageNumber, limitNumber);
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
    console.error('Erro ao buscar estudantes:', error);
    res.status(500).json({ error: externalization.errorFetchingStudents });
  }
};

const buscarUnicoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const estudante = await estudanteDao.buscarUnicoPorId(id);
    if (estudante) {
      res.status(200).json(estudante);
    } else {
      res.status(404).json({ error: externalization.notFoundStudent });
    }
  } catch (error) {
    res.status(500).json({ error: externalization.errorFetchingStudent });
  }
};

const buscarUnicoPorRa = async (req, res) => {
  try {
    const { ra } = req.params;
    const estudante = await estudanteDao.buscarUnicoPorRa(ra);
    if (estudante) {
      res.status(200).json(estudante);
    } else {
      res.status(404).json({ error: externalization.notFoundStudent });
    }
  } catch (error) {
    res.status(500).json({ error: externalization.errorFetchingStudent });
  }
};

const atualizar = async (req, res) => {
  try {
    const { ra } = req.params;
    const { nome, email, idade } = req.body;
    const updated = await estudanteDao.atualizar({ ra, nome, email, idade });

    if (updated) {
      res.status(200).json({ message: externalization.successEditingStudent });
    } else {
      res.status(404).json({ error: externalization.notFoundStudent });
    }
  } catch (error) {
    res.status(500).json({ error: externalization.errorEditingStudent });
  }
};

const excluir = async (req, res) => {
  try {
    const { ra } = req.params;
    const deleted = await estudanteDao.excluir(ra);

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
  inserir,
  buscarTodos,
  buscarUnicoPorId,
  buscarUnicoPorRa,
  atualizar,
  excluir
};
