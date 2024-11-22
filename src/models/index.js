const { sequelize } = require('../config/database');
const Localizacao = require('./Localizacao');
const Curso = require('./Curso');
const Armario = require('./Armario');
const Emprestimo = require('./Emprestimo');
const Estudante = require('./Estudante');
const Servidor = require('./Servidor');
const Concessao = require('./Concessao');
const MensagemUtil = require('../utils/mensagemUtil');

// Definindo os relacionamentos entre os modelos
// Armario.hasMany(Emprestimo, { as: 'emprestimos' });
// Servidor.hasMany(Concessao, { as: 'concessoes' });
// Concessao.belongsTo(Servidor, { as: 'servidor' });
// Concessao.belongsTo(Armario, { as: 'armario' });

// Emprestimo.belongsTo(Estudante, { as: 'estudante' });
// Emprestimo.belongsTo(Armario, { as: 'armario' });
// // Armario.belongsTo(Localizacao, { as: 'localizacao' });
// // Armario.hasMany(Concessao, { as: 'concessoes' });

// Estudante.hasMany(Emprestimo, { as: 'emprestimos' });
// Estudante.belongsTo(Curso, { as: 'curso' });

const initModels = async () => {
    try {
        await sequelize.authenticate();
        console.log(MensagemUtil.BANCO_SUCESSO_CONEXAO);
        // await sequelize.sync(); com essa linha criamos as tabelas no banco de dados
        await sequelize.sync()
        console.log(MensagemUtil.BANCO_SUCESSO_CARREGAMENTO);
    } catch (error) {
        console.error(MensagemUtil.BANCO_ERRO_CONFIGURACAO, error);
    }
};

initModels();

module.exports = {
    Armario,
    Emprestimo,
    Localizacao,
    Servidor,
    Concessao,
    Estudante,
    Curso,
    initModels
};
