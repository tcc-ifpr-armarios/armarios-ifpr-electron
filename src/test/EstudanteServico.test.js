"use strict";

const ArmarioServico = require("../service/ArmarioServico");
const EstudanteServico = require("../service/estudanteServico");
const LocalizacaoServico = require("../service/localizacaoServico");
const EmprestimoServico = require("../service/emprestimoServico");
const MensagemUtil = require("../utils/MensagemUtil");
const statusArmario = require("../models/StatusArmario");
const { initModels } = require("../models");
const { sequelize } = require('../config/database');
const { expect } = require('@jest/globals');
const Estudante = require('../models/Estudante');

describe('Teste Estudante Serviço', () => {
    let RA = "111";
    let id = "1";
    let estudante;
    let transaction;
    sequelize.models.tb_estudante = Estudante;
    let ultimoEstudante;

    beforeAll(async () => {
        await initModels();
        ultimoEstudante = await sequelize.models.tb_estudante.findOne({
            order: [['id_estudante', 'DESC']]
        });
        id = ultimoEstudante ? ultimoEstudante.id + 1 : 1;
    });

    beforeEach(async () => {
        estudante = {
            id: id,
            nome: 'Adrieli',
            sobrenome: 'Santos',
            email: 'adrieli@example.com',
            telefone: '(44) 9 9999-9999',
            ra: RA,
            senha: 'senhaTeste123!',
            ativo: true,
            id_curso: 1
        };
        transaction = await sequelize.transaction();
    });

    afterEach(async () => {
        await sequelize.models.tb_estudante.destroy({
            where: { ra: RA },
        });
        await sequelize.models.tb_estudante.destroy({
            where: { ra: '11' },
        });
        await transaction.rollback();
    });


    test('Deve inserir um novo estudante', async () => {
        const estudanteInserido = await EstudanteServico.inserir(estudante, { transaction });
        expect(estudanteInserido.nome).toBe(estudante.nome);
        expect(estudanteInserido.ativo).toBe(true);
    });

    test('Não deve inserir estudante com nome vazio ou nulo', async () => {
        estudante.nome = "";
        let message = '';

        try {
            await EstudanteServico.inserir(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);

        estudante.nome = null;

        try {
            await EstudanteServico.inserir(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
    });

    test('Não deve inserir estudante com sobrenome vazio ou nulo', async () => {
        estudante.sobrenome = "";
        let message = '';

        try {
            await EstudanteServico.inserir(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);

        estudante.sobrenome = null;

        try {
            await EstudanteServico.inserir(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
    });

    test('Não deve inserir estudante com e-mail inválido, vazio ou nulo', async () => {
        estudante.email = "email_invalido";
        let message = '';

        try {
            await EstudanteServico.inserir(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.VALIDACAO_EMAIL_INVALIDO);

        estudante.email = "";

        try {
            await EstudanteServico.inserir(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);

        estudante.email = null;

        try {
            await EstudanteServico.inserir(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
    });

    test('Não deve inserir estudante com senha vazia ou nula', async () => {
        estudante.senha = "";
        let message = '';

        try {
            await EstudanteServico.inserir(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);

        estudante.senha = null;

        try {
            await EstudanteServico.inserir(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
    });

    test('Não deve inserir estudante com telefone vazio ou nulo', async () => {
        estudante.telefone = "";
        let message = '';

        try {
            await EstudanteServico.inserir(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);

        estudante.telefone = null;

        try {
            await EstudanteServico.inserir(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
    });

    test('Não deve inserir estudante com RA duplicado', async () => {
        await EstudanteServico.inserir(estudante, { transaction });

        let message = '';
        try {
            await EstudanteServico.inserir({ ...estudante, email: "novo@example.com" });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_RA_DUPLICADO);
    });

    test('Deve listar ao menos um estudante', async () => {
        await EstudanteServico.inserir(estudante, { transaction });
        const resultado = await EstudanteServico.buscarTodos();
        expect(resultado).not.toBeNull();
        expect(resultado.length).toBeGreaterThan(0);
    });

    test('Deve encontrar o estudante com id inserido', async () => {
        await EstudanteServico.inserir(estudante, { transaction });
        const resultado = await EstudanteServico.buscarUnicoPorId(estudante.id); // Atualizado para `id`
        expect(resultado.id).toBe(estudante.id);  // Atualizado para `id`
    });

    test('Não deve encontrar o estudante com id', async () => {
        const resultado = await EstudanteServico.buscarUnicoPorId(-1);
        expect(resultado).toBe(null);
    });

    test('Deve excluir o estudante com id inserido', async () => {
        await EstudanteServico.inserir(estudante, { transaction });
        await EstudanteServico.excluir(estudante);
        const resultado = await EstudanteServico.buscarUnicoPorId(estudante.id);
        expect(resultado).toBe(null);
    });

    test('Não deve excluir estudante já removido', async () => {
        await EstudanteServico.inserir(estudante, { transaction });
        await EstudanteServico.excluir(estudante);

        let message = '';
        try {
            await EstudanteServico.excluir(estudante);
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_REMOVIDO);
    });

    test('Deve atualizar o estudante com id inserido', async () => {
        await EstudanteServico.inserir(estudante, { transaction });
        estudante.nome = "Teste";
        estudante.ativo = false;
        const estudanteAtualizado = await EstudanteServico.atualizar(estudante);
        expect(estudanteAtualizado.nome).toBe(estudante.nome);
        expect(estudanteAtualizado.ativo).toBe(estudante.ativo);
    });

    test('Deve atualizar mudando somente um atributo', async () => {
        await EstudanteServico.inserir(estudante, { transaction });
        estudante.nome = "Teste";
        estudante.ativo = false;
        const estudanteAtualizado = await EstudanteServico.atualizar(estudante);
        expect(estudanteAtualizado.nome).toBe(estudante.nome);
        expect(estudanteAtualizado.ativo).toBe(estudante.ativo);
    });

    test('Não deve atualizar para nome vazio ou nulo', async () => {
        await EstudanteServico.inserir(estudante, { transaction });
        estudante.nome = "";
        let message;

        try {
            await EstudanteServico.atualizar(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);

        estudante.nome = null;

        try {
            await EstudanteServico.atualizar(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
    });

    test('Não deve atualizar para sobrenome vazio ou nulo', async () => {
        await EstudanteServico.inserir(estudante, { transaction });
        estudante.sobrenome = "";
        let message;

        try {
            await EstudanteServico.atualizar(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);

        estudante.sobrenome = null;

        try {
            await EstudanteServico.atualizar(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
    });

    test('Não deve atualizar para email vazio ou nulo', async () => {
        await EstudanteServico.inserir(estudante, { transaction });
        estudante.email = "";
        let message;

        try {
            await EstudanteServico.atualizar(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);

        estudante.email = null;

        try {
            await EstudanteServico.atualizar(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
    });

    test('Não deve atualizar para senha vazia ou nula', async () => {
        await EstudanteServico.inserir(estudante, { transaction });
        estudante.senha = "";
        let message;

        try {
            await EstudanteServico.atualizar(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);

        estudante.senha = null;

        try {
            await EstudanteServico.atualizar(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
    });

    test('Não deve atualizar para telefone vazio ou nulo', async () => {
        await EstudanteServico.inserir(estudante, { transaction });
        estudante.telefone = "";
        let message;

        try {
            await EstudanteServico.atualizar(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);

        estudante.telefone = null;

        try {
            await EstudanteServico.atualizar(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
    });

    test('Não deve atualizar para ra vazio ou nulo', async () => {
        await EstudanteServico.inserir(estudante, { transaction });
        estudante.ra = "";
        let message;

        try {
            await EstudanteServico.atualizar(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);

        estudante.ra = null;

        try {
            await EstudanteServico.atualizar(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
    });

    test('Não deve atualizar para ra vazio ou nulo', async () => {
        await EstudanteServico.inserir(estudante, { transaction });
        estudante.ra = "";
        let message;

        try {
            await EstudanteServico.atualizar(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);

        estudante.ra = null;

        try {
            await EstudanteServico.atualizar(estudante, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
    });

    test('Não deve atualizar para ra duplicado', async () => {
        estudante = await EstudanteServico.inserir(estudante, { transaction });
        ultimoEstudante = await sequelize.models.tb_estudante.findOne({
            order: [['id_estudante', 'DESC']]
        });
        let estudanteAtualizacao = {
            id_estudante: ultimoEstudante ? ultimoEstudante.id_estudante + 1 : 1,
            nome: 'Adrieli',
            sobrenome: 'Santos',
            email: 'adrieli@example.com',
            telefone: '(44) 9 9999-9999',
            ra: '11',
            senha: 'senhaTeste123!',
            ativo: true,
            id_curso: 1
        };
        estudanteAtualizacao = await EstudanteServico.inserir(estudanteAtualizacao, { transaction });
        let message;

        try {
            estudanteAtualizacao.ra = RA;
            await EstudanteServico.atualizar(estudanteAtualizacao, { transaction });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_RA_DUPLICADO);
    });


    test('Não deve excluir estudante vinculada a armário ativo', async () => {
        const estudanteInserido = await EstudanteServico.inserir(estudante, { transaction });
        let localizacao = {
            descricao: 'Bloco 3',
            ativo: true
        };
        localizacao = await LocalizacaoServico.inserir(localizacao, { transaction });

        let armario = {
            numero: 'ARM-03',
            status: statusArmario.ATIVO,
            id_localizacao: localizacao.id
        };
        armario = await ArmarioServico.inserir(armario, { transaction });

        let emprestimo = {
            dataEmprestimo: new Date(),
            dataDevolucao: null,
            id_armario: armario.id,
            id_estudante: estudante.id
        };
        emprestimo = await EmprestimoServico.inserir(emprestimo);

        let message = '';
        try {
            await EstudanteServico.excluir(estudanteInserido);
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_VINCULADO_EMPRESTIMO);

        await EmprestimoServico.excluir(emprestimo);
        await ArmarioServico.excluir(armario);
        await LocalizacaoServico.excluir(localizacao);
    });

    test('Deve buscar estudantes ativos', async () => {
        await EstudanteServico.inserir(estudante, { transaction });

        const ativos = await EstudanteServico.buscarAtivos();
        expect(ativos.length).toBeGreaterThan(0);
        expect(ativos[0].ativo).toBe(true);
    });
});
