"use strict";

const EstudanteServico = require("../service/EstudanteServico");

module.exports = class EstudanteControle {
    
    static async buscarTodosPaginado(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const resposta = await EstudanteServico.buscarTodosPaginado(parseInt(page, 10), parseInt(limit, 10));
            res.status(200).json(resposta);
        } catch (e) {
            res.status(500).json({ error: e.message });
            console.log("EstudanteControle.buscarTodosPaginado " + e.message);
        }
    } // buscarTodosPaginado()

    static async inserir(req, res) {
        try {
            const estudante = req.body;
            const resultado = await EstudanteServico.inserir(estudante);
            res.status(201).json(resultado);
        } catch (e) {
            res.status(500).json({ error: e.message });
            console.log("EstudanteControle.inserir " + e.message);
        }
    } // inserir()

    static async buscarUnicoPorId(req, res) {
        try {
            const { id } = req.params;
            const estudante = await EstudanteServico.buscarUnicoPorId(id);
            if (estudante) {
                res.status(200).json(estudante);
            } else {
                res.status(404).json({ error: "Estudante não encontrado" });
            }
        } catch (e) {
            res.status(500).json({ error: e.message });
            console.log("EstudanteControle.buscarUnicoPorId " + e.message);
        }
    } // buscarUnicoPorId()

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const estudante = { ...req.body, id };
            const resultado = await EstudanteServico.atualizar(estudante);
            res.status(200).json(resultado);
        } catch (e) {
            res.status(500).json({ error: e.message });
            console.log("EstudanteControle.atualizar " + e.message);
        }
    } // atualizar()

    static async excluir(req, res) {
        try {
            const { id } = req.params;
            const resultado = await EstudanteServico.excluir({ id });
            res.status(200).json(resultado);
        } catch (e) {
            res.status(500).json({ error: e.message });
            console.log("EstudanteControle.excluir " + e.message);
        }
    } // excluir()

    static async buscarTodosPorNome(req, res) {
        try {
            const { nome } = req.query;
            const estudantes = await EstudanteServico.buscarTodosPorNome(nome);
            res.status(200).json(estudantes);
        } catch (e) {
            res.status(500).json({ error: e.message });
            console.log("EstudanteControle.buscarTodosPorNome " + e.message);
        }
    } // buscarTodosPorNome()

    static async buscarUnicoPorRa(req, res) {
        try {
            const { ra } = req.params;
            const estudante = await EstudanteServico.buscarUnicoPorRa(ra);
            if (estudante) {
                res.status(200).json(estudante);
            } else {
                res.status(404).json({ error: "Estudante não encontrado" });
            }
        } catch (e) {
            res.status(500).json({ error: e.message });
            console.log("EstudanteControle.buscarUnicoPorRa " + e.message);
        }
    } // buscarUnicoPorRa()

    static async buscarEstudantesPorRa(req, res) {
        try {
            const { ra } = req.query;
            const estudantes = await EstudanteServico.buscarEstudantesPorRa(ra);
            res.status(200).json(estudantes);
        } catch (e) {
            res.status(500).json({ error: e.message });
            console.log("EstudanteControle.buscarEstudantesPorRa " + e.message);
        }
    } // buscarEstudantesPorRa()

    static async buscarUnicoPorEmail(req, res) {
        try {
            const { email } = req.params;
            const estudante = await EstudanteServico.buscarUnicoPorEmail(email);
            if (estudante) {
                res.status(200).json(estudante);
            } else {
                res.status(404).json({ error: "Estudante não encontrado" });
            }
        } catch (e) {
            res.status(500).json({ error: e.message });
            console.log("EstudanteControle.buscarUnicoPorEmail " + e.message);
        }
    } // buscarUnicoPorEmail()

    static async buscarAtivos(req, res) {
        try {
            const ativos = await EstudanteServico.buscarAtivos();
            res.status(200).json(ativos);
        } catch (e) {
            res.status(500).json({ error: e.message });
            console.log("EstudanteControle.buscarAtivos " + e.message);
        }
    } // buscarAtivos()
};
