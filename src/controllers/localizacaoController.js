const Localizacao = require('../models/localizacao');

// Cria uma nova localização
const createLocalizacao = async (req, res) => {
  try {
    const { descricao, ativo } = req.body;
    const localizacao = await Localizacao.create({ descricao, ativo });
    res.status(201).json(localizacao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar a localização' });
  }
};

// Retorna todas as localizações
const getAllLocalizacoes = async (req, res) => {
  try {
    const localizacoes = await Localizacao.findAll();
    res.status(200).json(localizacoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar as localizações' });
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
      res.status(200).json(updatedLocalizacao);
    } else {
      res.status(404).json({ error: 'Localização não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar a localização' });
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
