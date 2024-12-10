const ArmarioDaoImpl = require('../dao/impl/ArmarioDaoImpl');
const armarioException = require("../excecoes/ArmarioException");
const MensagemUtil = require("../utils/MensagemUtil");
const EmprestimoDaoImpl = require("../dao/impl/EmprestimoDaoImpl");
const armarioDao = new ArmarioDaoImpl();

module.exports = class ArmarioServico {

    static async excluir(armario) {
        await this.verificaSeFoiRemovido(armario);
        await this.verificaSeExistemVinculos(armario);
        return await armarioDao.excluir(armario);
    }

    static async inserir(armario) {
        this.verificaCamposObrigatorios(armario);
        return await armarioDao.inserir(armario);
    }

    static verificaCamposObrigatorios(armario) {
        if (!armario.numero) {
            throw new armarioException(MensagemUtil.ARMARIO_CAMPO_OBRIGATORIO);
        }
        if (!armario.status) {
            throw new armarioException(MensagemUtil.ARMARIO_CAMPO_OBRIGATORIO);
        }
        if (!armario.id_localizacao) {
            throw new armarioException(MensagemUtil.ARMARIO_CAMPO_OBRIGATORIO);
        }
    }

    static async buscarTodos() {
        return await armarioDao.buscarTodos();
    }

    static async buscarPorStatus(status) {
        return await armarioDao.buscarPorStatus(status);
    }

    static async buscarUnicoPorId(id) {
        return await armarioDao.buscarUnicoPorId(id);
    }

    static async atualizar(armario) {
        await this.verificaCamposObrigatorios(armario);
        let l = await armarioDao.buscarUnicoPorNumeroELocalizacaoComIdDiferente(armario.id_localizacao, armario.numero, armario.id);
        if (l != null) {
            throw new armarioException(MensagemUtil.ARMARIO_JA_CADASTRADO_NA_LOCALIZACAO);
        }
        return await armarioDao.atualizar(armario);
    }

    static async verificaSeFoiRemovido(armario) {
        let l = await armarioDao.buscarUnicoPorId(armario.id);
        if (l == null) {
            throw new armarioException(MensagemUtil.ARMARIO_REMOVIDO);
        }
    }

    static async verificaSeExistemVinculos(armario) {
        let emprestimoDao = new EmprestimoDaoImpl();
        let a = await emprestimoDao.buscarTodosPorIdArmario(armario.id);
        if (a && a.length > 0) {
            throw new armarioException(MensagemUtil.ARMARIO_VINCULADO_EMPRESTIMO);
        }
    }
}