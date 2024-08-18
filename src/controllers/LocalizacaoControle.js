"use strict";

const LocalizacaoServico = require("../service/LocalizacaoServico");

module.exports = class LocalizacaoControle {
    static async buscarTodosPaginado(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            let resposta = await LocalizacaoServico.buscarTodosPaginado(parseInt(page, 10), parseInt(limit, 10));
            res.status(200).json(resposta);
        } catch (e) {
            res.status(500).json({ error: e.message });
            console.log("LocalizacaoControle.buscarTodos " + e.message);
        }
    } // buscarTodos()

    static async inserir(req, res) {
        try {
            res.status(201).json(await LocalizacaoServico.inserir(req.body));
        } catch (e) {
            res.status(500).json(e.message);
            console.log("LocalizacaoControle.inserir " + e.message);
        }
    } // inserir()

    static async buscarUnicoPorId(req, res) {
        try {
            res.status(200).json(await LocalizacaoServico.buscarUnicoPorId(req.params.id));
        } catch (e) {
            res.status(500).json(e.message);
            console.log("LocalizacaoControle.buscarUnicoPorId " + e.message);
        }
    } // buscarUnicoPorId()

    static async atualizar(req, res) {
        try {
            const { id } = req.params; // Extrai o ID dos parâmetros da URL
            const dadosAtualizados = { ...req.body, id }; // Combina o ID com os dados do corpo

            res.status(200).json(await LocalizacaoServico.atualizar(dadosAtualizados));
        } catch (e) {
            res.status(500).json(e.message);
            console.log("LocalizacaoControle.atualizar " + e.message);
        }
    } // atualizar()

    static async excluir(req, res) {
        try {
            res.status(200).json(await LocalizacaoServico.excluir({ id: req.params.id }));
        } catch (e) {
            res.status(500).json(e.message);
            console.log("LocalizacaoControle.excluir " + e.message);
        }
    } // excluir()

}; // class