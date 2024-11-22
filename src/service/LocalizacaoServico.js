"use strict";
const ArmarioDaoImpl = require('../dao/impl/ArmarioDaoImpl');
const LocalizacaoDaoImpl = require('../dao/impl/LocalizacaoDaoImpl');
const LocalizacaoException = require('../excecoes/LocalizacaoException');
const externalization = require('../externalization/request');
const MensagemUtil = require('../utils/mensagemUtil');

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
    console.log(localizacao)
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

  static async buscarTodosPaginado(numeroPagina, itensPorPagina) {
    const { count, rows } = await localizacaoDao.buscarTodosPaginado(numeroPagina, itensPorPagina);
    const totalPaginas = Math.ceil(count / itensPorPagina);

    return {
      data: rows,
      pagination: {
        totalItems: count,
        totalPages: totalPaginas,
        currentPage: numeroPagina,
        itemsPerPage: itensPorPagina
      }
    };
  }
};