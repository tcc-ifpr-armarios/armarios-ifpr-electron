"use strict";

const ServidorServico = require('../service/ServidorServico');
const MensagemUtil = require('../utils/mensagemUtil');

module.exports = class ServidorControle {
    static async buscarTodosPaginado(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const resposta = await ServidorServico.buscarTodosPaginado(parseInt(page, 10), parseInt(limit, 10));
            res.status(200).json(resposta);
        } catch (e) {
            res.status(500).json({ error: e.message });
            console.log("ServidorControle.buscarTodos " + e.message);
        }
    }

    static async buscarUnicoPorId(req, res) {
        try {
            const servidor = await ServidorServico.buscarUnicoPorId(req.params.id);
            res.status(200).json(servidor);
        } catch (e) {
            res.status(404).json({ error: e.message });
            console.log("ServidorControle.buscarUnicoPorId " + e.message);
        }
    }

    static async inserir(req, res) {
        try {
            const novoServidor = await ServidorServico.inserir(req.body);
            res.status(201).json(novoServidor);
        } catch (e) {
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaa");
            console.log(e);
            if(e.message === MensagemUtil.SERVIDOR_SENHA_PEQUENA){
                res.status(401).json({ error: e.message }); 
            }
            if(e.message === MensagemUtil.SERVIDOR_SIAPE_DUPLICADO || e.message === MensagemUtil.SERVIDOR_EMAIL_DUPLICADO || e.message === MensagemUtil.SERVIDOR_EMAIL_SIAPE_DUPLICADO){
                res.status(409).json({ error: e.message });
            }
            res.status(500).json({ error: e.message });
            console.log("ServidorControle.inserir " + e.message);
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const dadosAtualizados = { ...req.body, id };
            await ServidorServico.atualizar(dadosAtualizados);
            res.status(200).json({ message: 'Servidor atualizado com sucesso' });
        } catch (e) {
            if(e.message === MensagemUtil.SERVIDOR_SENHA_PEQUENA){
                res.status(401).json({ error: e.message }); 
            }
            if(e.message === MensagemUtil.SERVIDOR_SIAPE_DUPLICADO || e.message === MensagemUtil.SERVIDOR_EMAIL_DUPLICADO || e.message === MensagemUtil.SERVIDOR_EMAIL_SIAPE_DUPLICADO){
                res.status(409).json({ error: e.message });
            }
            res.status(500).json({ error: e.message });
            console.log("ServidorControle.inserir " + e.message);
        }
    }

    static async excluir(req, res) {
        try {
            await ServidorServico.excluir({ id: req.params.id });
            res.status(200).json({ message: 'Servidor excluído com sucesso' });
        } catch (e) {
            res.status(500).json({ error: e.message });
            console.log("ServidorControle.excluir " + e.message);
        }
    }
};
