const EstudanteException = require('../excecoes/EstudanteException');
const OperacaoUtil = require('../utils/OperacaoUtil');
const MensagemUtil = require('../utils/mensagemUtil');
const EstudanteDaoImpl = require('../dao/impl/estudanteDaoImpl');
const EmprestimoDaoImpl = require('../dao/impl/emprestimoDaoImpl');

const estudanteDao = new EstudanteDaoImpl();
const emprestimoDao = new EmprestimoDaoImpl();

module.exports = class EstudanteServico {

    async buscarTodos() {
        return await estudanteDao.buscarTodos();
    }

    async buscarUnicoPorId(id) {
        return await estudanteDao.buscarUnicoPorId(id);
    }

    async inse
    rir(estudante) {
        this.verificaCamposObrigatorios(estudante);
        this.validaCamposRegex(estudante);

        const e = await await estudanteDao.buscarUnicoPorRa(estudante.ra);
        if (e) {
            throw new EstudanteException(MensagemUtil.ESTUDANTE_RA_DUPLICADO);
        }

        return await estudanteDao.inserir(estudante);
    }

    async atualizar(estudante) {
        this.verificaCamposObrigatorios(estudante);
        this.validaCamposRegex(estudante);

        const e = await estudanteDao.buscarUnicoPorRaComIdDiferente(estudante.ra, estudante.id);
        if (e) {
            throw new EstudanteException(MensagemUtil.ESTUDANTE_RA_DUPLICADO);
        }

        return   await estudanteDao.atualizar(estudante);
    }

    async excluir(estudante) {
        const c = await estudanteDao.buscarUnicoPorId(estudante.id);
        if (!c) {
            throw new EstudanteException(MensagemUtil.ESTUDANTE_REMOVIDO);
        }

        const e = await  emprestimoDao.buscarTodosPorRaDoEstudante(estudante.ra);
        if (e.length > 0) {
            throw new EstudanteException(MensagemUtil.ESTUDANTE_VINCULADO_EMPRESTIMO);
        }

        return   await estudanteDao.excluir(estudante);
    }

    async buscarTodosPorNome(nome) {
        return await estudanteDao.buscarTodosPorNome(nome);
    }

    async buscarUnicoPorRa(ra) {
        return await estudanteDao.buscarUnicoPorRa(ra);
    }

    async buscarEstudantesPorRa(ra) {
        return await estudanteDao.buscarEstudantesPorRa(ra);
    }

    async buscarUnicoPorEmail(email) {
        return await estudanteDao.buscarUnicoPorEmail(email);
    }

    verificaCamposObrigatorios(estudante) {
        if (!estudante.nome) {
            throw new EstudanteException(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
        }
        if (!estudante.sobrenome) {
            throw new EstudanteException(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
        }
        if (!estudante.ra) {
            throw new EstudanteException(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
        }
        if (!estudante.email) {
            throw new EstudanteException(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
        }
        if (!estudante.senha) {
            throw new EstudanteException(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
        }
        if (!estudante.curso || estudante.curso.id === 0) {
            throw new EstudanteException(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
        }
        if (!estudante.telefone) {
            throw new EstudanteException(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
        }
    }

    validaCamposRegex(estudante) {
        if (!OperacaoUtil.ehTelefoneValido(estudante.telefone)) {
            throw new EstudanteException(MensagemUtil.VALIDACAO_TELEFONE_INVALIDO);
        }
        if (!OperacaoUtil.ehEmailValido(estudante.email)) {
            throw new EstudanteException(MensagemUtil.VALIDACAO_EMAIL_INVALIDO);
        }
    }

    async buscarAtivos() {
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
}

