const EstudanteException = require('../excecoes/EstudanteException');
const OperacaoUtil = require('../utils/OperacaoUtil');
const MensagemUtil = require('../utils/mensagemUtil');
const EstudanteDaoImpl = require('../dao/impl/EstudanteDaoImpl');
const EmprestimoDaoImpl = require('../dao/impl/EmprestimoDaoImpl');
const CursoDaoImpl = require('../dao/impl/CursoDaoImpl');

const estudanteDao = new EstudanteDaoImpl();
const emprestimoDao = new EmprestimoDaoImpl();
const cursoDao = new CursoDaoImpl();

module.exports = class EstudanteServico {

    static async buscarTodos() {
        return await estudanteDao.buscarTodos();
    }

    static async buscarUnicoPorId(id) {
        return await estudanteDao.buscarUnicoPorId(id);
    }

    static async inserir(estudante) {
        this.verificaCamposObrigatorios(estudante);
        this.validaCamposRegex(estudante);

        const e = await await estudanteDao.buscarUnicoPorRa(estudante.ra);
        if (e) {
            throw new EstudanteException(MensagemUtil.ESTUDANTE_RA_DUPLICADO);
        }

        const c = await cursoDao.buscarUnicoPorId(estudante.id_curso);
        if (c == null) {
            throw new EstudanteException(MensagemUtil.CURSO_NAO_ENCONTRADO);
        }

        return await estudanteDao.inserir(estudante);
    }

    static async atualizar(estudante) {
        this.verificaCamposObrigatorios(estudante);
        this.validaCamposRegex(estudante);

        const e = await estudanteDao.buscarUnicoPorRaComIdDiferente(estudante.ra, estudante.id);
        if (e) {
            throw new EstudanteException(MensagemUtil.ESTUDANTE_RA_DUPLICADO);
        }

        return await estudanteDao.atualizar(estudante);
    }

    static async excluir(estudante) {
        const c = await estudanteDao.buscarUnicoPorId(estudante.id);
        if (!c) {
            throw new EstudanteException(MensagemUtil.ESTUDANTE_REMOVIDO);
        }

        const e = await emprestimoDao.buscarTodosPorIdDoEstudante(estudante.id);
        if (e.length > 0) {
            throw new EstudanteException(MensagemUtil.ESTUDANTE_VINCULADO_EMPRESTIMO);
        }

        return await estudanteDao.excluir(estudante);
    }

    static async buscarTodosPorNome(nome) {
        return await estudanteDao.buscarTodosPorNome(nome);
    }

    static async buscarUnicoPorRa(ra) {
        return await estudanteDao.buscarUnicoPorRa(ra);
    }

    static async buscarEstudantesPorRa(ra) {
        return await estudanteDao.buscarEstudantesPorRa(ra);
    }

    static async buscarUnicoPorEmail(email) {
        return await estudanteDao.buscarUnicoPorEmail(email);
    }

    static verificaCamposObrigatorios(estudante) {
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
        if (!estudante.id_curso || estudante.id_curso === 0) {
            throw new EstudanteException(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
        }
        if (!estudante.telefone) {
            throw new EstudanteException(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
        }
    }

    static validaCamposRegex(estudante) {
        if (estudante.telefone != null) {
            if (!OperacaoUtil.ehTelefoneValido(estudante.telefone)) {
                throw new EstudanteException(MensagemUtil.VALIDACAO_TELEFONE_INVALIDO);
            }
        }

        if (estudante.email != null) {
            if (!OperacaoUtil.ehEmailValido(estudante.email)) {
                throw new EstudanteException(MensagemUtil.VALIDACAO_EMAIL_INVALIDO);
            }
        }
    }

    static async buscarAtivos() {
        return await estudanteDao.buscarAtivos();
    }

    static async buscarTodosPaginado(numeroPagina, itensPorPagina) {
        const {count, rows} = await estudanteDao.buscarTodosPaginado(numeroPagina, itensPorPagina);
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

