"use strict";

const ArmarioServico = require("../service/ArmarioServico");
const EstudanteServico = require("../service/EstudanteServico");
const MensagemUtil = require("../utils/MensagemUtil");
const statusArmario = require("../models/statusArmario");
const { initModels } = require("../models");
const { sequelize } = require('../config/database');

describe('Teste Estudante Serviço', () => {
    const DESCRICAO = "TESTE-ESTUDANTE-01";
    let estudante;

    beforeAll(async () => {
        await initModels();
    });

    beforeEach(() => {
        estudante = { id: 1,
                        nome: 'adrieli',
                        email: 'adrieli',
                        telefone: '44999999',
                        ra: '111111'};
    });

    afterEach(async () => {
        // Remove todos os dados do banco de dados após cada teste
        await sequelize.truncate({ cascade: true });
    });

    test('Deve inserir uma nova estudante', async () => {
        estudante = await EstudanteServico.inserir(estudante);
        expect(estudante.id).toBeGreaterThan(0);
        expect(estudante.descricao).toBe(DESCRICAO);
        expect(estudante.ativo).toBe(true);
    });

    test('Não deve inserir descrição vazia ou nula', async () => {
        let message = '';
        try {
            estudante.descricao = '';
            await EstudanteServico.inserir(estudante);
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);

        try {
            estudante.descricao = null;
            await EstudanteServico.inserir(estudante);
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
    });

    test('Não deve inserir descrição duplicada', async () => {
        let message = '';
        try {
            await EstudanteServico.inserir(estudante);
            let estudanteDuplicada = { descricao: DESCRICAO };
            await EstudanteServico.inserir(estudanteDuplicada);
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_DESCRICAO_DUPLICADA);
    });

    test('Deve listar ao menos uma', async () => {
        await EstudanteServico.inserir(estudante);
        let localizacoes = await EstudanteServico.buscarTodos();
        expect(localizacoes.length).toBeGreaterThan(0);
    });

    test('Deve listar somente ativos', async () => {
        await EstudanteServico.inserir(estudante);
        let localizacoes = await EstudanteServico.buscarAtivos();
        expect(localizacoes.length).toBeGreaterThan(0);
    });

    test('Deve encontrar a estudante com o id inserido', async () => {
        estudante = await EstudanteServico.inserir(estudante);
        let l = await EstudanteServico.buscarUnicoPorId(estudante.id);
        expect(l.id).toBe(estudante.id);
        expect(l.descricao).toBe(estudante.descricao);
    });

    test('Não deve encontrar a estudante com id inexistente', async () => {
        let l = await EstudanteServico.buscarUnicoPorId(0);
        expect(l).toBeNull();
    });

    test('Deve excluir a estudante com o id inserido', async () => {
        estudante = await EstudanteServico.inserir(estudante);
        await EstudanteServico.excluir(estudante);
        let l = await EstudanteServico.buscarUnicoPorId(estudante.id);
        expect(l).toBeNull();
    });

    test('Não deve excluir estudante já removida', async () => {
        estudante = await EstudanteServico.inserir(estudante);
        await EstudanteServico.excluir(estudante);

        let message = '';
        try {
            await EstudanteServico.excluir(estudante);
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_REMOVIDA);
    });

    test('Deve atualizar a estudante com o id inserido', async () => {
        estudante = await EstudanteServico.inserir(estudante);
        estudante.descricao = DESCRICAO + " atualizada";
        estudante.ativo = false;
        await EstudanteServico.atualizar(estudante);
        let l = await EstudanteServico.buscarUnicoPorId(estudante.id);
        expect(l.descricao).toBe(estudante.descricao);
        expect(l.ativo).toBe(false);
    });

    test('Deve atualizar somente um atributo', async () => {
        estudante = await EstudanteServico.inserir(estudante);
        estudante.ativo = false;
        await EstudanteServico.atualizar(estudante);
        let l = await EstudanteServico.buscarUnicoPorId(estudante.id);
        expect(l.descricao).toBe(estudante.descricao);
        expect(l.ativo).toBe(estudante.ativo);
    });

    test('Não deve atualizar para descrição vazia ou nula', async () => {
        estudante = await EstudanteServico.inserir(estudante);
        let message = '';

        try {
            estudante.descricao = '';
            await EstudanteServico.atualizar(estudante);
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);

        try {
            estudante.descricao = null;
            await EstudanteServico.atualizar(estudante);
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_CAMPO_OBRIGATORIO);
    });

    test('Não deve atualizar para descrição duplicada', async () => {
        estudante = await EstudanteServico.inserir(estudante);
        let estudanteDuplicada = { descricao: DESCRICAO + " duplicada" };
        estudanteDuplicada = await EstudanteServico.inserir(estudanteDuplicada);

        let message = '';
        try {
            estudanteDuplicada.descricao = estudante.descricao;
            await EstudanteServico.atualizar(estudanteDuplicada);
        } catch (error) {
            message = error.message;
        }
        await EstudanteServico.excluir(estudanteDuplicada);
        expect(message).toBe(MensagemUtil.ESTUDANTE_DESCRICAO_DUPLICADA);
    });

    test('Não deve excluir estudante vinculada a um armário', async () => {
        let armario = { numero: 'TESTE-ESTUDANTE', status: statusArmario.ATIVO };
        let message = '';

        try {
            estudante = await EstudanteServico.inserir(estudante);
            armario.idEstudante = estudante.id;
            armario = await ArmarioServico.inserir(armario);
            await EstudanteServico.excluir(estudante);
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.ESTUDANTE_VINCULADA_ARMARIO);
        await ArmarioServico.excluir(armario);
    });

    test('Buscar todos com paginação', async () => {
        estudante = await EstudanteServico.inserir(estudante);
        let r = await EstudanteServico.buscarTodosPaginado(1, 10);
        expect(r.pagination.totalItems).toBeGreaterThan(0);
        expect(r.pagination.currentPage).toBe(1);
        expect(r.data.length).toBeGreaterThan(0);
        expect(r.data.length).toBeLessThan(10);
    });
});