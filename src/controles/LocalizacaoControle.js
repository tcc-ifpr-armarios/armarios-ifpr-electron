"use strict";

const LocalizacaoServico = require("../service/localizacaoServico");

module.exports = class LocalizacaoControle {
    static async buscarTodosPaginado(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            let resposta = await LocalizacaoServico.buscarTodosPaginado(parseInt(page, 10), parseInt(limit, 10));
            res.status(200).json(resposta);
        } catch (e) {
            res.status(500).json({ error: e.message });
            console.log("LocalizacaoControle.buscarTodos " + e.message);
        }
    } // buscarTodos()

    static async inserir(req, res) {
        try {
            res.status(201).json(await LocalizacaoServico.inserir(req.body));
        } catch (e) {
            res.status(500).json(e.message);
            console.log("LocalizacaoControle.inserir " + e.message);
        }
    } // inserir()

    static async buscarUnicoPorId(req, res) {
        try {
            res.status(200).json(await LocalizacaoServico.buscarUnicoPorId(req.params.id));
        } catch (e) {
            res.status(500).json(e.message);
            console.log("LocalizacaoControle.buscarUnicoPorId " + e.message);
        }
    } // buscarUnicoPorId()

    static async atualizar(req, res) {
        try {
            const { id } = req.params; // Extrai o ID dos parâmetros da URL
            const dadosAtualizados = { ...req.body, id }; // Combina o ID com os dados do corpo

            res.status(200).json(await LocalizacaoServico.atualizar(dadosAtualizados));
        } catch (e) {
            res.status(500).json(e.message);
            console.log("LocalizacaoControle.atualizar " + e.message);
        }
    } // atualizar()

    static async excluir(req, res) {
        try {
            res.status(200).json(await LocalizacaoServico.excluir({ id: req.params.id }));
        } catch (e) {
            res.status(500).json(e.message);
            console.log("LocalizacaoControle.excluir " + e.message);
        }
    } // excluir()

}; // class

/*
const inserir = async (req, res) => {
  try {
    const { descricao, ativo } = req.body;
    const localizacao = await localizacaoDao.inserir({ descricao, ativo });
    res.status(201).json({ message: externalization.successCreatingLocation, data: localizacao });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError' && error.parent && error.parent.code === '23505') {
      // Erro de chave duplicada, no PostgreSQL esse código é 23505 (SequelizeUniqueConstraintError)
      res.status(400).json({ error: externalization.duplicateDescription });
    }
    console.error('Erro ao criar localizacao:', error);
    res.status(500).json({ error: externalization.errorCreatingLocation });
  }
};

const buscarTodos = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  try {
    const { count, rows } = await localizacaoDao.buscarTodos(pageNumber, limitNumber);
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
    res.status(500).json({ error: externalization.errorFetchingLocations });
  }
};

const excluir = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await localizacaoDao.excluir(id);
    
    if (deleted) {
      res.status(200).json({ message: externalization.successDeletingLocation });
    } else {
      res.status(404).json({ error: externalization.notFoundLocation });
    }
  } catch (error) {
    res.status(500).json({ error: externalization.errorDeletingLocation });
  }
};

const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, ativo } = req.body;
    const updated = await localizacaoDao.atualizar( descricao, ativo, id);  

    if (updated) {
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
}

const buscarUnicoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const localizacao = await localizacaoDao.buscarUnicoPorId(id);
    if (localizacao) {
      res.status(200).json(localizacao);
    } else {
      res.status(404).json({ error: externalization.notFoundLocation });
    }
  } catch (error) {
    res.status(500).json({ error: externalization.errorFetchingLocation });
  }
};



module.exports = { inserir, buscarTodos, excluir, atualizar, buscarUnicoPorId };
*/
