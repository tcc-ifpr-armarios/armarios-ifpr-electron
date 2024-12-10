const emprestimoException = require('../excecoes/EmprestimoException');
const MensagemUtil = require('../utils/mensagemUtil');
const EmprestimoDaoImpl = require('../dao/impl/EmprestimoDaoImpl');
const emprestimoDao = new EmprestimoDaoImpl();

module.exports = class EmprestimoServico {

    static async buscarTodos() {
        return await emprestimoDao.buscarTodos();
    }

    static async buscarUnicoPorId(id) {
        return await emprestimoDao.buscarUnicoPorId(id);
    }

    static async inserir(emprestimo) {
        this.verificaCamposObrigatorios(emprestimo);
        this.verificaRestricoes(emprestimo);

        return await emprestimoDao.inserir(emprestimo);
    }

    static async atualizar(emprestimo) {
        this.verificaCamposObrigatorios(emprestimo);
        this.validaCamposRegex(emprestimo);

        const e = await emprestimoDao.buscarUnicoPorRaComIdDiferente(emprestimo.ra, emprestimo.id);
        if (e) {
            throw new emprestimoException(MensagemUtil.Emprestimo_RA_DUPLICADO);
        }

        return await emprestimoDao.atualizar(emprestimo);
    }

    static async excluir(emprestimo) {
        const c = await emprestimoDao.buscarUnicoPorId(emprestimo.id);
        if (!c) {
            throw new emprestimoException(MensagemUtil.EMPRESTIMO_REMOVIDO);
        }

        return await emprestimoDao.excluir(emprestimo);
    }

    static async verificaCamposObrigatorios(emprestimo) {
        if (!emprestimo.id_estudante) {
            throw new emprestimoException(MensagemUtil.EMPRESTIMO_CAMPO_OBRIGATORIO);
        }
        if (!emprestimo.id_armario) {
            throw new emprestimoException(MensagemUtil.EMPRESTIMO_CAMPO_OBRIGATORIO);
        }
    }

    static async verificaRestricoes(emprestimo) {
        const a = await emprestimoDao.buscarAtivoPorIdArmario(emprestimo.id_armario);
        if (a != null) {
            throw new emprestimoException(MensagemUtil.EMPRESTIMO_ARMARIO_POSSUI_EMPRESTIMO_ATIVO);
        }

        const e = await emprestimoDao.buscarAtivoPorIdDoEstudante(emprestimo.id_estudante);
        if (e != null) {
            throw new emprestimoException(MensagemUtil.EMPRESTIMO_ESTUDANTE_POSSUI_EMPRESTIMO_ATIVO);
        }
    }

    static async finalizarEmprestimo(emprestimo) {
        const e = await emprestimoDao.buscarUnicoPorId(emprestimo.id);
        if (e != null) {
            throw new emprestimoException(MensagemUtil.EMPRESTIMO_JA_FINALIZADO);
        }

        emprestimo = {
            dataDevolucao: new Date()
        }
        this.atualizar(emprestimo);
    }

    static async buscarAtivos() {
        return await emprestimoDao.buscarAtivos();
    }

}

