"use strict";

const ArmarioServico = require("../service/ArmarioServico");
const EstudanteServico = require("../service/EstudanteServico");
const MensagemUtil = require("../utils/MensagemUtil");
const statusArmario = require("../models/StatusArmario");
const { initModels } = require("../models");
const { sequelize } = require('../config/database');

describe('Teste Estudante Serviço', () => {
    const RA = "111111";
    let estudante;

    beforeAll(async () => {
        await initModels();
    });

    beforeEach(async () => {
        estudante = {
            id: 1,
            nome: 'Adrieli',
            sobrenome: 'Santos',
            email: 'adrieli@example.com',
            telefone: '44999999',
            ra: RA,
            senha: 'senhaTeste123!',
            id_curso: 1
        };
    });

    afterEach(async () => {
        await sequelize.truncate({ cascade: true });
    });

    test('Deve inserir um novo estudante com dados válidos', async () => {
        const estudanteInserido = await EstudanteServico.inserir(estudante);
        expect(estudanteInserido.id).toBeGreaterThan(0);
        expect(estudanteInserido.nome).toBe(estudante.nome);
        expect(estudanteInserido.ativo).toBe(true);
    });

    test('Não deve inserir estudante com e-mail inválido', async () => {
        estudante.email = "email_invalido";
        let message = '';

        try {
            await EstudanteServico.inserir(estudante);
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.EMAIL_INVALIDO);
    });

    test('Não deve inserir estudante com RA duplicado', async () => {
        await EstudanteServico.inserir(estudante);

        let message = '';
        try {
            await EstudanteServico.inserir({ ...estudante, email: "novo@example.com" });
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_RA_DUPLICADO);
    });

    test('Deve buscar estudantes com paginação válida', async () => {
        for (let i = 0; i < 15; i++) {
            await EstudanteServico.inserir({
                ...estudante,
                ra: RA + i,
                email: `estudante${i}@example.com`
            });
        }

        const resultado = await EstudanteServico.buscarTodosPaginado(1, 10);
        expect(resultado.pagination.currentPage).toBe(1);
        expect(resultado.pagination.totalItems).toBe(15);
        expect(resultado.data.length).toBe(10);
    });

    test('Não deve atualizar estudante para nome vazio', async () => {
        const estudanteInserido = await EstudanteServico.inserir(estudante);
        estudanteInserido.nome = "";

        let message = '';
        try {
            await EstudanteServico.atualizar(estudanteInserido);
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
    });

    test('Não deve excluir estudante vinculada a armário ativo', async () => {
        const estudanteInserido = await EstudanteServico.inserir(estudante);
        const armario = {
            numero: 'ARM-01',
            status: statusArmario.ATIVO,
            idEstudante: estudanteInserido.id
        };

        await ArmarioServico.inserir(armario);

        let message = '';
        try {
            await EstudanteServico.excluir(estudanteInserido);
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_VINCULADA_ARMARIO);
    });

    test('Deve buscar estudantes ativos', async () => {
        await EstudanteServico.inserir(estudante);

        const ativos = await EstudanteServico.buscarAtivos();
        expect(ativos.length).toBeGreaterThan(0);
        expect(ativos[0].ativo).toBe(true);
    });
});
