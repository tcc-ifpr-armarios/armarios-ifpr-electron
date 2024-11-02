"use strict";

const ServidorDaoImpl = require('../dao/impl/servidorDaoImpl');
const ServidorException = require('../excecoes/ServidorException');
const MensagemUtil = require('../utils/mensagemUtil');

const { converteSenhaParaSha256Hex } = require("../../src/utils/autenticacaoUtil");

const servidorDao = new ServidorDaoImpl();

module.exports = class ServidorServico {
  
  static async buscarTodosPaginado(numeroPagina, itensPorPagina) {
    const { count, rows } = await servidorDao.buscarTodosPaginado(numeroPagina, itensPorPagina);
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

  static async buscarUnicoPorId(id) {
    const servidor = await servidorDao.buscarUnicoPorId(id);
    if (!servidor) {
      throw new ServidorException(MensagemUtil.SERVIDOR_NAO_ENCONTRADO);
    }
    return servidor;
  }

  static async inserir(servidor) {
    if(servidor.senha){
        await this.verificaTamanhoSenha(servidor)
        const senhaEncriptada = converteSenhaParaSha256Hex(servidor.senha)
        servidor.senha = senhaEncriptada;
    } else {
      throw new ServidorException(MensagemUtil.SERVIDOR_SENHA_VAZIA);
    }
    await this.verificaCamposObrigatorios(servidor);
    await this.verificaDadosDuplicados(servidor);
    return await servidorDao.inserir(servidor);
  }

  static async atualizar(servidor) {
    if(servidor.senha){
      await this.verificaTamanhoSenha(servidor);
      const senhaEncriptada = converteSenhaParaSha256Hex(servidor.senha);
      servidor.senha = senhaEncriptada;
    }
    await this.verificaDadosDuplicados(servidor);
    return await servidorDao.atualizar(servidor);
  }

  static async excluir(servidor) {
    const existente = await servidorDao.buscarUnicoPorId(servidor.id);
    if (!existente) {
      throw new ServidorException(MensagemUtil.SERVIDOR_NAO_ENCONTRADO);
    }
    return await servidorDao.excluir(servidor);
  }

  static async buscarUnicoPorEmail(email) {
    return await servidorDao.buscarUnicoPorEmail(email);
  }

  static async buscarUnicoPorEmailOuSiape(emailOuSiape) {
    return await servidorDao.buscarUnicoPorEmailOuSiape(emailOuSiape);
  }

  static verificaCamposObrigatorios(servidor) {
    if (!servidor || !servidor.nome || !servidor.email || !servidor.siape) {
      throw new ServidorException(MensagemUtil.SERVIDOR_CAMPO_OBRIGATORIO);
    }
  }

  static async verificaDadosDuplicados(servidor) {
    const existente = await servidorDao.buscarUnicoPorEmailOuSiape(servidor);
    
    if (existente.code == 1 ) {
      throw new ServidorException(MensagemUtil.SERVIDOR_EMAIL_SIAPE_DUPLICADO);
    } else if( existente.code == 2) {
      throw new ServidorException(MensagemUtil.SERVIDOR_EMAIL_DUPLICADO);
    } else if(existente.code == 3) {
      throw new ServidorException(MensagemUtil.SERVIDOR_SIAPE_DUPLICADO);
    }
  }

  static async verificaTamanhoSenha(servidor) {
    if(servidor.senha && servidor.senha.length < 4 ){
      throw new ServidorException(MensagemUtil.SERVIDOR_SENHA_PEQUENA);
    }
  }
};
