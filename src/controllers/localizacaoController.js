const Localizacao = require('../models/localizacao');
const externalization = require('../externalization/request');

// Cria uma nova localização
const createLocalizacao = async (req, res) => {
  console.log(externalization.successCreatingLocation);
  try {
    const { descricao, ativo } = req.body;
    const localizacao = await Localizacao.create({ descricao, ativo });
    res.status(201).json({ message: externalization.successCreatingLocation });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError' && error.parent && error.parent.code === '23505') {
      // Erro de chave duplicada, no PostgreSQL esse código é 23505 (SequelizeUniqueConstraintError)
      res.status(400).json({ error: externalization.duplicateDescription });
    }
    console.error('Erro ao criar localizacao:', error);
    res.status(500).json({ error: externalization.errorCreatingLocation });
  }
};

// Retorna todas as localizações
const getAllLocalizacoes = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const offset = (pageNumber - 1) * limitNumber;

  try {
    const { count, rows } = await Localizacao.findAndCountAll({
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
    res.status(500).json({ error: externalization.errorFetchingLocations });
  }
};

// Retorna uma localização por ID
const getLocalizacaoById = async (req, res) => {
  try {
    const { id } = req.params;
    const localizacao = await Localizacao.findByPk(id);
    if (localizacao) {
      res.status(200).json(localizacao);
    } else {
      res.status(404).json({ error: 'Localização não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar a localização' });
  }
};

// Atualiza uma localização por ID
const updateLocalizacao = async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, ativo } = req.body;
    const [updated] = await Localizacao.update({ descricao, ativo }, {
      where: { id }
    });

    if (updated) {
      const updatedLocalizacao = await Localizacao.findByPk(id);
      res.status(200).json({ message: externalization.successEditingLocation });
    } else {
      res.status(404).json({ error: externalization.notFoundLocation });
    }
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError' && error.parent && error.parent.code === '23505') {
      // Erro de chave duplicada, no PostgreSQL esse código é 23505 (SequelizeUniqueConstraintError)
      res.status(400).json({ error: externalization.duplicateDescription });
    }
    res.status(500).json({ error: externalization.errorEditingLocation });
  }
};

// Deleta uma localização por ID
const deleteLocalizacao = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Localizacao.destroy({
      where: { id }
    });

    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Localização não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar a localização' });
  }
};

module.exports = {
  createLocalizacao,
  getAllLocalizacoes,
  getLocalizacaoById,
  updateLocalizacao,
  deleteLocalizacao
};
