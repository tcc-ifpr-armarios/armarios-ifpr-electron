const ArmarioServico = require("../service/ArmarioServico");
const LocalizacaoServico = require("../service/localizacaoServico");
const MensagemUtil = require("../utils/MensagemUtil");
const statusArmario = require("../models/StatusArmario");
const { initModels } = require("../models");
const EstudanteServico = require("../service/EstudanteServico");
const EmprestimoServico = require("../service/EmprestimoServico");
const CursoServico = require("../service/CursoServico");
const {sequelize} = require("../config/database");
const Armario = require("../models/Armario");

describe("Teste Armario Servico", () => {
    const NUMERO_ARMARIO = "TESTE-01";
    const LOCALIZACAO = "LOCAL-TESTE-ARMARIO";

    let armario;
    let armarioAtualizacao;
    let localizacao;
    sequelize.models.tb_armario= Armario;
    let transaction;

    beforeAll(async () => {
        await initModels();
        ultimoArmario = await sequelize.models.tb_armario.findOne({
            order: [['id_armario', 'DESC']]
        });
        id_armario = ultimoArmario ? ultimoArmario.id + 1 : 1;
    });

    beforeEach(async () => {
        if (!localizacao) {
            localizacao = await LocalizacaoServico.buscarUnicoPorDescricaoExata(LOCALIZACAO);
            if (!localizacao) {
                localizacao = await LocalizacaoServico.inserir({ descricao: LOCALIZACAO });
            }
        }

        armario = {
            numero: NUMERO_ARMARIO,
            id_localizacao: localizacao.id,
            status: statusArmario.ATIVO
        };
        transaction = await sequelize.transaction();
    });

    afterEach(async () => {
        if (armario.id != null) {
            await sequelize.models.tb_armario.destroy({
                where: {id: armario.id},
            });
        }
        await transaction.rollback();
    });

    afterAll(async () => {
        const localizacaoEncontrada = await LocalizacaoServico.buscarUnicoPorDescricaoExata(LOCALIZACAO);
        if (localizacaoEncontrada) await LocalizacaoServico.excluir(localizacaoEncontrada);
    });

    test("Não deve inserir número vazio ou nulo", async () => {
        await expect(async () => {
            armario.numero = null;
            await ArmarioServico.inserir(armario);
        }).rejects.toThrow(MensagemUtil.ARMARIO_CAMPO_OBRIGATORIO);

        await expect(async () => {
            armario.numero = "";
            await ArmarioServico.inserir(armario);
        }).rejects.toThrow(MensagemUtil.ARMARIO_CAMPO_OBRIGATORIO);
    });

    test("Não deve inserir localizacao nula ou id invalido", async () => {
        await expect(async () => {
            armario.id_localizacao = 0;
            await ArmarioServico.inserir(armario);
        }).rejects.toThrow(MensagemUtil.ARMARIO_CAMPO_OBRIGATORIO);

        await expect(async () => {
            armario.id_localizacao = null;
            await ArmarioServico.inserir(armario);
        }).rejects.toThrow(MensagemUtil.ARMARIO_CAMPO_OBRIGATORIO);
    });

    test("Deve inserir um novo armario", async () => {
        armario = await ArmarioServico.inserir(armario);
        expect(armario.id).toBeGreaterThan(0);
        expect(armario.numero).toBe(NUMERO_ARMARIO);
        expect(armario.status).toBe(statusArmario.ATIVO);
        expect(armario.id_localizacao).toBe(localizacao.id);
    });

    test("Deve listar ao menos um", async () => {
        armario = await ArmarioServico.inserir(armario);
        const listaDeArmarios = await ArmarioServico.buscarTodos();
        expect(listaDeArmarios.length).toBeGreaterThan(0);
    });

    test("Deve listar somente ativos", async () => {
        armario = await ArmarioServico.inserir(armario);
        const listaDeArmarios = await ArmarioServico.buscarPorStatus(statusArmario.ATIVO);
        expect(listaDeArmarios.length).toBeGreaterThan(0);
    });

    test("Deve encontrar o armario com id inserido", async () => {
        armario = await ArmarioServico.inserir(armario);
        const encontrado = await ArmarioServico.buscarUnicoPorId(armario.id);
        expect(encontrado.id).toBe(armario.id);
    });

    test("Não deve encontrar o id", async () => {
        const encontrado = await ArmarioServico.buscarUnicoPorId(-1);
        expect(encontrado).toBeNull();
    });

    test("Deve excluir o armario Com id inserido", async () => {
        armario = await ArmarioServico.inserir(armario);
        await ArmarioServico.excluir(armario);
        const encontrado = await ArmarioServico.buscarUnicoPorId(armario.id);
        expect(encontrado).toBeNull();
    });

    test("Não deve excluir armario ja removido", async () => {
        armario = await ArmarioServico.inserir(armario);
        await ArmarioServico.excluir(armario);

        await expect(async () => {
            await ArmarioServico.excluir(armario);
        }).rejects.toThrow(MensagemUtil.ARMARIO_REMOVIDO);
    });

    test("Deve atualizar o armario com id inserido", async () => {
        armario = await ArmarioServico.inserir(armario);
        armario.numero += " - Atualizado";
        armario.status = statusArmario.INATIVO;

        const atualizado = await ArmarioServico.atualizar(armario);
        expect(atualizado.numero).toBe(armario.numero);
        expect(atualizado.status).toBe(armario.status);
    });

    test("Deve atualizar mudando somente um atributo", async () => {
        armario = await ArmarioServico.inserir(armario);
        armario.status = statusArmario.EM_MANUTENCAO;

        const atualizado = await ArmarioServico.atualizar(armario);

        expect(atualizado.numero).toBe(armario.numero);
        expect(atualizado.status).toBe(armario.status);
    });

    test("Não deve atualizar para numero vazio ou nulo", async () => {
        armario = await ArmarioServico.inserir(armario);

        await expect(async () => {
            armario.numero = "";
            await ArmarioServico.atualizar(armario);
        }).rejects.toThrow(MensagemUtil.ARMARIO_CAMPO_OBRIGATORIO);

        await expect(async () => {
            armario.numero = null;
            await ArmarioServico.atualizar(armario);
        }).rejects.toThrow(MensagemUtil.ARMARIO_CAMPO_OBRIGATORIO);
    });

    test("Não deve atualizar para número duplicado na mesma localizacao", async () => {
        armarioAtualizacao = {
            numero: NUMERO_ARMARIO + "Para atualizar",
            id_localizacao: localizacao.id,
            status: statusArmario.ATIVO
        };

        armario = await ArmarioServico.inserir(armario);
        armarioAtualizacao = await ArmarioServico.inserir(armarioAtualizacao);

        armarioAtualizacao.numero = armario.numero;

        await expect(async () => {
            await ArmarioServico.atualizar(armarioAtualizacao);
        }).rejects.toThrow(MensagemUtil.ARMARIO_JA_CADASTRADO_NA_LOCALIZACAO);

        await ArmarioServico.excluir(armarioAtualizacao);
    });

    test("Não deve excluir armario vinculado a um emprestimo", async () => {
        armario = await ArmarioServico.inserir(armario);

        const curso = await CursoServico.inserir({ nome: "Curso Testes ArmarioS" });

        const estudante = await EstudanteServico.inserir({
            nome: "Estudante",
            sobrenome: "Teste",
            email: "teste@teste.com",
            telefone: "(44) 9 9999-9999",
            ra: "2023232325",
            senha: "123456",
            id_curso: curso.id
        });

        const emprestimo = await EmprestimoServico.inserir({
            dataEmprestimo: new Date(),
            dataDevolucao: null,
            id_armario: armario.id,
            id_estudante: estudante.id
        });

        await expect(async () => {
            await ArmarioServico.excluir(armario);
        }).rejects.toThrow(MensagemUtil.ARMARIO_VINCULADO_EMPRESTIMO);

        await EmprestimoServico.excluir(emprestimo);
        await EstudanteServico.excluir(estudante);
        await CursoServico.excluir(curso);
    });

});
