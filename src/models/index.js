const { sequelize } = require('../config/database');
const Localizacao = require('./localizacao');
const Curso = require('./curso');
const Armario = require('./armario');
const Emprestimo = require('./emprestimo');
const Estudante = require('./estudante');
const Servidor = require('./servidor');
const Concessao = require('./concessao');
const MensagemUtil = require('../utils/MensagemUtil');

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
        await sequelize.sync({ force: false, alter: false })
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
