const crypto = require('crypto');
require('dotenv').config();
const CHAVE_PRIVADA =  "ArmariosIFPR-Paranvaí"; /// jogar pro env
function converteSenhaParaSha256Hex(senha) {
    if (!CHAVE_PRIVADA) {
        throw new Error('CHAVE_CRIPTOGRAFIA não definida nas variáveis de ambiente.');
    }

    const senhaComChavePrivada = CHAVE_PRIVADA + senha + CHAVE_PRIVADA;
    return crypto.createHash('sha256').update(senhaComChavePrivada).digest('hex');
}

module.exports = { converteSenhaParaSha256Hex };