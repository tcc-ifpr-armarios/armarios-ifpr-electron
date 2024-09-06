"use strict";

const EstudanteDaoImpl = require('../dao/impl/estudanteDaoImpl');
const EstudanteException = require('../excecoes/EstudanteException');
const MensagemUtil = require('../utils/MensagemUtil');
const estudanteDao = new EstudanteDaoImpl();

module.exports = class EstudanteServico {


  static async atualizar(estudante) {
    await this.verificaCamposObrigatorios(estudante);
    let l = await estudanteDao.buscarUnicoPorRa(estudante.ra, estudante.id);
    if (l != null) {
      throw new EstudanteException(MensagemUtil.ESTUDANTE_RA_DUPLICADA);
    }
    return await estudanteDao.atualizar(estudante);
  }

  static async inserir(estudante) {
    await this.verificaCamposObrigatorios(estudante);
    await this.verificaDadosDuplicados(estudante);
    return await estudanteDao.inserir(estudante);
  }

  static async buscarUnicoPorId(id) {
    return await estudanteDao.buscarUnicoPorId(id);
  }

  static async excluir(estudante) {
    await this.verificaSeFoiRemovido(estudante);
    return await estudanteDao.excluir(estudante);
  }

  static async buscarUnicoPorRA(ra) {
    return await estudanteDao.buscarUnicoPorRa(ra);
  }

  static verificaCamposObrigatorios(estudante) {
    if (!estudante || !estudante.email || estudante.email.trim() === '') {
      throw new EstudanteException(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
    }
    if (!estudante || !estudante.nome || estudante.nome.trim() === '') {
      throw new EstudanteException(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
    }
    if (!estudante || !estudante.telefone || estudante.telefone.trim() === '') {
      throw new EstudanteException(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
    }
    if (!estudante || !estudante.ra || estudante.ra.trim() === '') {
      throw new EstudanteException(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
    }
  }
  static async verificaDadosDuplicados(estudante) {
    let l = await estudanteDao.buscarUnicoPorRa(estudante.ra);
    if (l != null) {
      throw new EstudanteException(MensagemUtil.ESTUDANTE_DESCRICAO_DUPLICADA);
    }
  }

  static async verificaSeFoiRemovido(estudante) {
    let l = await estudanteDao.buscarUnicoPorId(estudante.id);
    if (l == null) {
      throw new EstudanteException(MensagemUtil.ESTUDANTE_REMOVIDA);
    }
  }

  static async buscarTodos() {
    return await estudanteDao.buscarTodos();
  }

  static async buscarAtivos() {
    return await estudanteDao.buscarAtivos();
  }

  static async buscarTodosPaginado(numeroPagina, itensPorPagina) {
    const { count, rows } = await estudanteDao.buscarTodosPaginado(numeroPagina, itensPorPagina);
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