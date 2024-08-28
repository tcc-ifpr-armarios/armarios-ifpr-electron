module.exports = {
    dev: {
        DB_USER: 'postgres',
        DB_PASS: 'postgres',
        DB_NAME: 'armarios_ifpr_electron',
        DB_HOST: 'localhost',
        DB_PORT: 5432,
        DB_DIALECT: 'postgres'
    },
    prod: {
        DB_USER: '',
        DB_PASS: '',
        DB_NAME: '',
        DB_HOST: '',
        DB_PORT: 5432,
        DB_DIALECT: ''
    },
    test: {
        DB_USER: 'postgres',
        DB_PASS: 'postgres',
        DB_NAME: 'armarios_ifpr_electron_test',
        DB_HOST: 'localhost',
        DB_PORT: 5432,
        DB_DIALECT: 'postgres'
    }
};