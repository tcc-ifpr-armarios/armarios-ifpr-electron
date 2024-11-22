const { converteSenhaParaSha256Hex } = require("./src/utils/AutenticacaoUtil");

const senha = '123456';

const senhaCriptografada = converteSenhaParaSha256Hex(senha);

console.log(senhaCriptografada);
