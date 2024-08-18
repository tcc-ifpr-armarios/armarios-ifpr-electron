"use strict";

const LocalizacaoException = require("../excecoes/LocalizacaoException");
const Localizacao = require("../models/localizacao");
const LocalizacaoServico = require("../service/LocalizacaoServico");
const MensagemUtil = require("../utils/MensagemUtil");

describe('Teste Localização Serviço', () => {
    const DESCRICAO = "TESTE-LOCALIZACAO-01";
    let localizacao;

    beforeEach(() => {
        localizacao = { descricao: DESCRICAO };
    });

    afterEach(async () => {
        if (localizacao) {
            if (localizacao.id > 0) {
                let l = await LocalizacaoServico.buscarUnicoPorId(localizacao.id);
                if (l != null) {
                    await LocalizacaoServico.excluir(l);
                }
            } else {
                let l = await LocalizacaoServico.buscarUnicoPorDescricaoExata(localizacao.descricao);
                if (l != null) {
                    await LocalizacaoServico.excluir(l);
                }
            }
        }
    });

    test('Deve inserir uma nova localização', async () => {
        localizacao = await LocalizacaoServico.inserir(localizacao);
        expect(localizacao.id).toBeGreaterThan(0);
        expect(localizacao.descricao).toBe(DESCRICAO);
        expect(localizacao.ativo).toBe(true);
    });

    test('Não deve inserir descrição vazia ou nula', async () => {
        let message = '';
        try {
            localizacao.descricao = '';
            await LocalizacaoServico.inserir(localizacao);
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.LOCALIZACAO_CAMPO_OBRIGATORIO);

        try {
            localizacao.descricao = null;
            await LocalizacaoServico.inserir(localizacao);
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.LOCALIZACAO_CAMPO_OBRIGATORIO);
    });

    test('Não deve inserir descrição duplicada', async () => {
        let message = '';
        try {
            await LocalizacaoServico.inserir(localizacao);
            let localizacaoDuplicada = { descricao: DESCRICAO };
            await LocalizacaoServico.inserir(localizacaoDuplicada);
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.LOCALIZACAO_DESCRICAO_DUPLICADA);
    });

    test('Deve listar ao menos uma', async () => {
        await LocalizacaoServico.inserir(localizacao);
        let localizacoes = await LocalizacaoServico.buscarTodos();
        expect(localizacoes.length).toBeGreaterThan(0);
    });

    test('Deve listar somente ativos', async () => {
        await LocalizacaoServico.inserir(localizacao);
        let localizacoes = await LocalizacaoServico.buscarAtivos();
        expect(localizacoes.length).toBeGreaterThan(0);
    });

    test('Deve encontrar a localização com o id inserido', async () => {
        localizacao = await LocalizacaoServico.inserir(localizacao);
        let l = await LocalizacaoServico.buscarUnicoPorId(localizacao.id);
        expect(l.id).toBe(localizacao.id);
        expect(l.descricao).toBe(localizacao.descricao);
    });

    test('Não deve encontrar a localização com id inexistente', async () => {
        let l = await LocalizacaoServico.buscarUnicoPorId(0);
        expect(l).toBeNull();
    });

    test('Deve excluir a localização com o id inserido', async () => {
        localizacao = await LocalizacaoServico.inserir(localizacao);
        await LocalizacaoServico.excluir(localizacao);
        let l = await LocalizacaoServico.buscarUnicoPorId(localizacao.id);
        expect(l).toBeNull();
    });

    test('Não deve excluir localização já removida', async () => {
        localizacao = await LocalizacaoServico.inserir(localizacao);
        await LocalizacaoServico.excluir(localizacao);

        let message = '';
        try {
            await LocalizacaoServico.excluir(localizacao);
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.LOCALIZACAO_REMOVIDA);
    });

    test('Deve atualizar a localização com o id inserido', async () => {
        localizacao = await LocalizacaoServico.inserir(localizacao);
        localizacao.descricao = DESCRICAO + "atualizada";
        localizacao.ativo = false;
        await LocalizacaoServico.atualizar(localizacao);
        let l = await LocalizacaoServico.buscarUnicoPorId(localizacao.id);
        expect(l.descricao).toBe(localizacao.descricao);
        expect(l.ativo).toBe(false);
    });

    test('Deve atualizar somente um atributo', async () => {
        localizacao = await LocalizacaoServico.inserir(localizacao);
        localizacao.ativo = false;
        await LocalizacaoServico.atualizar(localizacao);
        let l = await LocalizacaoServico.buscarUnicoPorId(localizacao.id);
        expect(l.descricao).toBe(localizacao.descricao);
        expect(l.ativo).toBe(localizacao.ativo);
    });

    test('Não deve atualizar para descrição vazia ou nula', async () => {
        localizacao = await LocalizacaoServico.inserir(localizacao);
        let message = '';

        try {
            localizacao.descricao = '';
            await LocalizacaoServico.atualizar(localizacao);
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.LOCALIZACAO_CAMPO_OBRIGATORIO);

        try {
            localizacao.descricao = null;
            await LocalizacaoServico.atualizar(localizacao);
        } catch (error) {
            message = error.message;
        }

        expect(message).toBe(MensagemUtil.LOCALIZACAO_CAMPO_OBRIGATORIO);
    });

    test('Não deve atualizar para descrição duplicada', async () => {
        // TODO
    });

    test('Não deve excluir localização vinculada a um armário', async () => {
        // TODO
    });
});