"use strict";
const ArmarioDaoImpl = require('../dao/impl/armarioDaoImpl');
const LocalizacaoDaoImpl = require('../dao/impl/localizacaoDaoImpl');
const LocalizacaoException = require('../excecoes/LocalizacaoException');
const externalization = require('../externalization/request');
const MensagemUtil = require('../utils/MensagemUtil');
const localizacaoDao = new LocalizacaoDaoImpl();

module.exports = class LocalizacaoServico {


  static async atualizar(localizacao) {
    await this.verificaCamposObrigatorios(localizacao);
    let l = await localizacaoDao.buscarUnicoPorDescricaoExataComIdDiferente(localizacao.descricao, localizacao.id);
    if (l != null) {
      throw new LocalizacaoException(MensagemUtil.LOCALIZACAO_DESCRICAO_DUPLICADA);
    }
    return await localizacaoDao.atualizar(localizacao);
  }

  static async inserir(localizacao) {
    await this.verificaCamposObrigatorios(localizacao);
    await this.verificaDadosDuplicados(localizacao);
    return await localizacaoDao.inserir(localizacao);
  }

  static async buscarUnicoPorId(id) {
    return await localizacaoDao.buscarUnicoPorId(id);
  }

  static async excluir(localizacao) {
    await this.verificaSeFoiRemovido(localizacao);
    await this.verificaSeExistemVinculos(localizacao);
    return await localizacaoDao.excluir(localizacao);
  }

  static async buscarUnicoPorDescricaoExata(descricao) {
    return await localizacaoDao.buscarUnicoPorDescricaoExata(descricao);
  }

  static verificaCamposObrigatorios(localizacao) {
    if (!localizacao || !localizacao.descricao || localizacao.descricao.trim() === '') {
      throw new LocalizacaoException(MensagemUtil.LOCALIZACAO_CAMPO_OBRIGATORIO);
    }
  }
  static async verificaDadosDuplicados(localizacao) {
    let l = await localizacaoDao.buscarUnicoPorDescricaoExata(localizacao.descricao);
    if (l != null) {
      throw new LocalizacaoException(MensagemUtil.LOCALIZACAO_DESCRICAO_DUPLICADA);
    }
  }

  static async verificaSeFoiRemovido(localizacao) {
    let l = await localizacaoDao.buscarUnicoPorId(localizacao.id);
    if (l == null) {
      throw new LocalizacaoException(MensagemUtil.LOCALIZACAO_REMOVIDA);
    }
  }

  static async verificaSeExistemVinculos(localizacao) {
    let armarioDao = new ArmarioDaoImpl();
    let a = await armarioDao.buscarTodosPorIdLocalizacao(localizacao.id);
    if (a && a.length > 0) {
      throw new LocalizacaoException(MensagemUtil.LOCALIZACAO_VINCULADA_ARMARIO);
    }
  }

  static async buscarTodos() {
    return await localizacaoDao.buscarTodos();
  }

  static async buscarAtivos() {
    return await localizacaoDao.buscarAtivos();
  }
};
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
