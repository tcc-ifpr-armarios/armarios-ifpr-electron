"use strict";

const LocalizacaoServico = require("../service/LocalizacaoServico");

module.exports = class LocalizacaoControle {
    static async buscarTodos(req, res) {
        try {
            res.status(200).send(await LocalizacaoServico.buscarTodos());
        } catch (e) {
            res.status(500).send(e.message);
            console.log("LocalizacaoControle.buscarTodos " + e.message);
        }
    } // buscarTodos()

    static async inserir(req, res) {
        try {
            res.status(201).send(await LocalizacaoServico.inserir(req.body));
        } catch (e) {
            res.status(500).send(e.message);
            console.log("LocalizacaoControle.inserir " + e.message);
        }
    } // inserir()

    static async buscarUnicoPorId(req, res) {
        try {
            res.status(200).send(await LocalizacaoServico.buscarUnicoPorId(req.params.id));
        } catch (e) {
            res.status(500).send(e.message);
            console.log("LocalizacaoControle.buscarUnicoPorId " + e.message);
        }
    } // buscarUnicoPorId()

    static async atualizar(req, res) {
        try {
            res.status(200).send(await LocalizacaoServico.atualizar(req.body));
        } catch (e) {
            res.status(500).send(e.message);
            console.log("LocalizacaoControle.atualizar " + e.message);
        }
    } // atualizar()

    static async excluir(req, res) {
        try {
            res.status(200).send(await LocalizacaoServico.excluir(req.body));
        } catch (e) {
            res.status(500).send(e.message);
            console.log("LocalizacaoControle.excluir " + e.message);
        }
    } // excluir()

}; // class