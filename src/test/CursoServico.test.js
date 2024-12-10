const CursoServico = require("../service/CursoServico");
const MensagemUtil = require("../utils/MensagemUtil");
const { initModels } = require("../models");
const EstudanteServico = require("../service/EstudanteServico");
const {sequelize} = require("../config/database");
const Curso = require("../models/Curso");

describe("Teste Curso Serviço", () => {
    let curso;
    let cursoAtualizacao;
    sequelize.models.tb_curso = Curso;
    let transaction;

    beforeAll(async () => {
        await initModels();
    });

    beforeEach(async () => {
        curso = {nome: "Curso Teste", ativo: true};
        transaction = await sequelize.transaction();
    });

    afterEach(async () => {
        if (curso.id != null) {
            await sequelize.models.tb_curso.destroy({
                where: {id: curso.id},
            });
        }
        await transaction.rollback();
    });

    test("Deve inserir um novo curso", async () => {
        curso = await CursoServico.inserir(curso);

        expect(curso.id).toBeGreaterThan(0);
        expect(curso.nome).toBe("Curso Teste");
        expect(curso.ativo).toBe(true);
    });

    test("Não deve inserir nome vazio ou nulo", async () => {
        await expect(async () => {
            curso.nome = "";
            await CursoServico.inserir(curso);
        }).rejects.toThrow(MensagemUtil.CURSO_CAMPO_OBRIGATORIO);

        await expect(async () => {
            curso.nome = null;
            await CursoServico.inserir(curso);
        }).rejects.toThrow(MensagemUtil.CURSO_CAMPO_OBRIGATORIO);
    });

    test("Não deve inserir nome duplicado", async () => {
        curso = await CursoServico.inserir(curso);
        const cursoDuplicado = { nome: "Curso Teste" };

        await expect(async () => {
            await CursoServico.inserir(cursoDuplicado);
        }).rejects.toThrow(MensagemUtil.CURSO_NOME_DUPLICADO);
    });

    test("Deve listar ao menos um", async () => {
        curso = await CursoServico.inserir(curso);

        const listaDeCursos = await CursoServico.buscarTodos();
        expect(listaDeCursos.length).toBeGreaterThan(0);
    });

    test("Deve listar somente ativos", async () => {
        curso = await CursoServico.inserir(curso);

        const listaDeCursos = await CursoServico.buscarAtivos();
        expect(listaDeCursos.length).toBeGreaterThan(0);
    });

    test("Deve encontrar o curso com id inserido", async () => {
        curso = curso = await CursoServico.inserir(curso);

        const cursoEncontrado = await CursoServico.buscarUnicoPorId(curso.id);
        expect(cursoEncontrado.id).toBe(curso.id);
    });

    test("Não deve encontrar o id", async () => {
        const cursoEncontrado = await CursoServico.buscarUnicoPorId(-1);
        expect(cursoEncontrado).toBeNull();
    });

    test("Deve excluir o curso com id inserido", async () => {
        curso = await CursoServico.inserir(curso);

        await CursoServico.excluir(curso);

        const cursoEncontrado = await CursoServico.buscarUnicoPorId(curso.id);
        expect(cursoEncontrado).toBeNull();
    });

    test("Não deve excluir curso ja removido", async () => {
        curso = await CursoServico.inserir(curso);
        await CursoServico.excluir(curso);

        await expect(async () => {
            await CursoServico.excluir(curso);
        }).rejects.toThrow(MensagemUtil.CURSO_REMOVIDO);
    });

    test("Deve atualizar o curso com id inserido", async () => {
        curso = await CursoServico.inserir(curso);

        curso.nome = "Curso Teste Atualizado";
        curso.ativo = false;

        const cursoAtualizado = await CursoServico.atualizar(curso);

        expect(cursoAtualizado.nome).toBe("Curso Teste Atualizado");
        expect(cursoAtualizado.ativo).toBe(false);
    });

    test("Deve atualizar mudando somente um atributo", async () => {
        curso = await CursoServico.inserir(curso);

        curso.ativo = false;

        const cursoAtualizado = await CursoServico.atualizar(curso);

        expect(cursoAtualizado.nome).toBe(curso.nome);
        expect(cursoAtualizado.ativo).toBe(false);
    });

    test("Não deve atualizar para nome vazio ou nulo", async () => {
        curso = await CursoServico.inserir(curso);

        await expect(async () => {
            curso.nome = "";
            await CursoServico.atualizar(curso);
        }).rejects.toThrow(MensagemUtil.CURSO_CAMPO_OBRIGATORIO);

        await expect(async () => {
            curso.nome = null;
            await CursoServico.atualizar(curso);
        }).rejects.toThrow(MensagemUtil.CURSO_CAMPO_OBRIGATORIO);
    });

    test("Não deve atualizar para nome duplicado", async () => {
        cursoAtualizacao = { nome: "Para atualizar" };

        curso = await CursoServico.inserir(curso);
        cursoAtualizacao = await CursoServico.inserir(cursoAtualizacao);

        cursoAtualizacao.nome = curso.nome;

        await expect(async () => {
            await CursoServico.atualizar(cursoAtualizacao);
        }).rejects.toThrow(MensagemUtil.CURSO_NOME_DUPLICADO);

        await CursoServico.excluir(cursoAtualizacao);
    });

    test("Não deve excluir durso vinculado a um estudante", async () => {
        curso = await CursoServico.inserir(curso);

        let estudante = {
            nome: "Estudante",
            sobrenome: "Teste",
            email: "teste@teste.com",
            telefone: "(44) 9 9999-9999",
            ra: "2023232325",
            senha: "123456",
            id_curso: curso.id
        };

        estudante = await EstudanteServico.inserir(estudante);

        await expect(async () => {
            await CursoServico.excluir(curso);
        }).rejects.toThrow(MensagemUtil.CURSO_VINCULADO_ESTUDANTE);

        await EstudanteServico.excluir(estudante);
    });
});
