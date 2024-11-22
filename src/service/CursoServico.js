"use strict";
const EstudanteDaoImpl = require('../dao/impl/EstudanteDaoImpl');
const cursoDaoImpl = require('../dao/impl/CursoDaoImpl');
const cursoException = require('../excecoes/CursoException');
const MensagemUtil = require('../utils/mensagemUtil');

const cursoDao = new cursoDaoImpl();

module.exports = class cursoServico {


  static async atualizar(curso) {
    await this.verificaCamposObrigatorios(curso);
    let l = await cursoDao.buscarUnicoPorNomeExatoComIdDiferente(curso.nome, curso.id);
    if (l != null) {
      throw new cursoException(MensagemUtil.CURSO_NOME_DUPLICADO);
    }
    return await cursoDao.atualizar(curso);
  }

  static async inserir(curso) {
    await this.verificaCamposObrigatorios(curso);
    await this.verificaDadosDuplicados(curso);
    return await cursoDao.inserir(curso);
  }

  static async buscarUnicoPorId(id) {
    return await cursoDao.buscarUnicoPorId(id);
  }

  static async excluir(curso) {
    await this.verificaSeFoiRemovido(curso);
    await this.verificaSeExistemVinculos(curso);
    return await cursoDao.excluir(curso);
  }

  static async buscarUnicoPorNomeExato(nome) {
    return await cursoDao.buscarUnicoPorNomeExato(nome);
  }

  static verificaCamposObrigatorios(curso) {
    if (!curso || !curso.nome || curso.nome.trim() === '') {
      throw new cursoException(MensagemUtil.CURSO_NOME_OBRIGATORIO);
    }
  }
  static async verificaDadosDuplicados(curso) {
    let l = await cursoDao.buscarUnicoPorNomeExato(curso.nome);
    if (l != null) {
      throw new cursoException(MensagemUtil.CURSO_NOME_DUPLICADO);
    }
  }

  static async verificaSeFoiRemovido(curso) {
    console.log(curso)
    let l = await cursoDao.buscarUnicoPorId(curso.id);
    if (l == null) {
      throw new cursoException(MensagemUtil.CURSO_REMOVIDO);
    }
  }

  static async verificaSeExistemVinculos(curso) {
    let estudanteDao = new EstudanteDaoImpl();
    let a = await estudanteDao.buscarTodosPorIdCurso(curso.id);
    if (a && a.length > 0) {
      throw new cursoException(MensagemUtil.CURSO_VINCULADO_ESTUDANTE);
    }
  }

  static async buscarTodos() {
    return await cursoDao.buscarTodos();
  }

  static async buscarAtivos() {
    return await cursoDao.buscarTodosAtivos();
  }

  static async buscarTodosPaginado(numeroPagina, itensPorPagina) {
    const { count, rows } = await cursoDao.buscarTodos(numeroPagina, itensPorPagina);
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