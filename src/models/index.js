const sequelize = require('../config/database');
const Localizacao = require('./localizacao');
const Curso = require('./curso');
const Armario = require('./armario');
const Emprestimo = require('./emprestimo');
const Estudante = require('./estudante');
const Servidor = require('./servidor');
const Concessao = require('./concessao');

// Definindo os relacionamentos entre os modelos
// Armario.hasMany(Emprestimo, { as: 'emprestimos' });
Servidor.hasMany(Concessao, { as: 'concessoes' });
Concessao.belongsTo(Servidor, { as: 'servidor' });
Concessao.belongsTo(Armario, { as: 'armario' });

Emprestimo.belongsTo(Estudante, { as: 'estudante' });
Emprestimo.belongsTo(Armario, { as: 'armario' });
// Armario.belongsTo(Localizacao, { as: 'localizacao' });
// Armario.hasMany(Concessao, { as: 'concessoes' });

Estudante.hasMany(Emprestimo, { as: 'emprestimos' });
Estudante.belongsTo(Curso, { as: 'curso' });

const initModels = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await sequelize.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
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
