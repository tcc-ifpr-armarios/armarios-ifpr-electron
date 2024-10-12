const { Servidor, Estudante} = require('../models');
const { converteSenhaParaSha256Hex } = require('../utils/autenticacaoUtil');
const MensagemUtil = require('../utils/mensagemUtil');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const secret = process.env.JWT_SECRET;

async function verificaAdm(siape, senha) {
    try {
        const senhaCriptografada = converteSenhaParaSha256Hex(senha);
        const user = await Servidor.findOne({ where: { siape } });
        if (user) {
            if (senhaCriptografada === user.senha) {
                const token = jwt.sign(
                    { servidorId: user.id, servidorNome: user.nome },
                    secret,
                    { expiresIn: '1h' }
                );
                return { sucesso: true, token }; 
            } else {
                return { sucesso: false, mensagem: MensagemUtil.LOGIN_SENHA_INCORRETA };
            }
        } else {
            return { sucesso: false, mensagem: MensagemUtil.LOGIN_CADASTRO_INEXISTENTE };
        }
    } catch (error) {
        log.error('Erro ao verificar servidor: ', error);
        return { sucesso: false, mensagem: MensagemUtil.INTERNAL_SERVER_ERROR };
    }
}

async function verificaEstudante(ra, senha) {
    try {
        const senhaCriptografada = converteSenhaParaSha256Hex(senha);
        const user = await Estudante.findOne({where: {ra}});
        if (user) {
            if (senhaCriptografada === user.senha) {
                const token = jwt.sign(
                    {estudanteId: user.id, estudanteNome: user.nome},
                    secret,
                    {expiresIn: '1h'}
                );
                return {sucesso: true, token};
            } else {
                return {sucesso: false, mensagem: MensagemUtil.LOGIN_SENHA_INCORRETA};
            }
        } else {
            return {sucesso: false, mensagem: MensagemUtil.LOGIN_CADASTRO_INEXISTENTE};
        }
    } catch (error) {
        log.error('Erro ao verificar estudante: ', error);
        return {sucesso: false, mensagem: MensagemUtil.INTERNAL_SERVER_ERROR};
    }

}



module.exports = { verificaAdm, verificaEstudante };