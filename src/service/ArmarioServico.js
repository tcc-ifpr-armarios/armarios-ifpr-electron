const ArmarioDaoImpl = require('../dao/impl/armarioDaoImpl');
const armarioDao = new ArmarioDaoImpl();

module.exports = class ArmarioServico {

    static async excluir(armario) {
        return await armarioDao.excluir(armario);
    }

    static async inserir(armario) {
        return await armarioDao.inserir(armario);
    }
}