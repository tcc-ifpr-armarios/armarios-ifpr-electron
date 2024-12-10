const EmprestimoServico = require("../service/EmprestimoServico");
const MensagemUtil = require("../utils/MensagemUtil");
const {initModels} = require("../models");
const {sequelize} = require("../config/database");
const Emprestimo = require("../models/Emprestimo");
const EstudanteServico = require("../service/EstudanteServico");
const LocalizacaoServico = require("../service/LocalizacaoServico");
const statusArmario = require("../models/StatusArmario");
const ArmarioServico = require("../service/ArmarioServico");

describe("Teste Emprestimo Serviço", () => {
    let emprestimo;
    let estudante;
    let localizacao;
    let armario;
    let emprestimoAtualizacao;
    sequelize.models.tb_emprestimo = Emprestimo;
    let transaction;

    beforeAll(async () => {
        await initModels();
    });

    beforeEach(async () => {
        estudante = await EstudanteServico.buscarEstudantesPorRa("2023232323");
        localizacao = await LocalizacaoServico.buscarUnicoPorDescricaoExata("LOCAL-TESTE-EMPRESTIMO");
        armario = await ArmarioServico.buscarUnicoPorId(135);
        emprestimo = {
            dataEmprestimo: new Date(),
            dataDevolucao: null,
            id_armario: armario.id,
            id_estudante: estudante.id
        };
        transaction = await sequelize.transaction();
    });

    afterEach(async () => {
        if (emprestimo.id != null) {
            await sequelize.models.tb_emprestimo.destroy({
                where: {id: emprestimo.id},
            });
        }
        await transaction.rollback();
    });

    test('Não deve inserir estudante nulo ou com ID inválido', async () => {
        await expect(async () => {
            emprestimo.id_estudante = null;
            await EmprestimoServico.inserir(emprestimo);
        }).rejects.toThrow(MensagemUtil.EMPRESTIMO_CAMPO_OBRIGATORIO);

        await expect(async () => {
            emprestimo.id_estudante = 0;
            await EmprestimoServico.inserir(emprestimo);
        }).rejects.toThrow(MensagemUtil.EMPRESTIMO_CAMPO_OBRIGATORIO);
    });

    test('Não deve inserir armário nulo ou com ID inválido', async () => {
        await expect(async () => {
            emprestimo.id_armario = null;
            await EmprestimoServico.inserir(emprestimo);
        }).rejects.toThrow(MensagemUtil.EMPRESTIMO_CAMPO_OBRIGATORIO);

        await expect(async () => {
            emprestimo.id_armario = 0;
            await EmprestimoServico.inserir(emprestimo);
        }).rejects.toThrow(MensagemUtil.EMPRESTIMO_CAMPO_OBRIGATORIO);
    });

    test('Deve inserir um novo empréstimo', async () => {
        emprestimo = await EmprestimoServico.inserir(emprestimo);
        await expect(emprestimo.id).toBeGreaterThan(0);
        await expect(emprestimo.dataEmprestimo).not.toBeNull();
    });

    test('Deve excluir o empréstimo inserido', async () => {
        let novoEmprestimo = await EmprestimoServico.inserir(emprestimo);
        await expect(novoEmprestimo.id).toBeGreaterThan(0);

        novoEmprestimo = await EmprestimoServico.excluir(novoEmprestimo);
        novoEmprestimo = await EmprestimoServico.buscarUnicoPorId(novoEmprestimo.id);
        await expect(novoEmprestimo).toBeNull();
    });

    test('Não deve excluir empréstimo já removido', async () => {
        emprestimo = await EmprestimoServico.inserir(emprestimo);
        await EmprestimoServico.excluir(emprestimo);

        await expect(async () => {
            await EmprestimoServico.excluir(emprestimo);
        }).rejects.toThrow(MensagemUtil.EMPRESTIMO_REMOVIDO);
    });

    test('Deve finalizar um empréstimo ativo', async () => {
        emprestimo = await EmprestimoServico.inserir(emprestimo);

        const emprestimoFinalizado = await EmprestimoServico.finalizarEmprestimo(emprestimo);

        await expect(emprestimo.id).toBe(emprestimoFinalizado.id);
        await expect(emprestimo.dataDevolucao).not.toBeNull();
    });

    test('Não deve finalizar um empréstimo já finalizado', async () => {
        emprestimo = await EmprestimoServico.inserir(emprestimo);
        await EmprestimoServico.finalizarEmprestimo(emprestimo);

        await expect(async () => {
            await EmprestimoServico.finalizarEmprestimo(emprestimo);
        }).rejects.toThrow(MensagemUtil.EMPRESTIMO_JA_FINALIZADO);
    });

    test('Estudante não deve possuir dois empréstimos ativos', async () => {
        await EmprestimoServico.inserir(emprestimo);

        const novoEmprestimo = {
            dataEmprestimo: new Date(),
            dataDevolucao: null,
            id_armario: armario.id,
            id_estudante: estudante.id
        };

        await expect(async () => {
            await EmprestimoServico.inserir(novoEmprestimo);
        }).rejects.toThrow(MensagemUtil.EMPRESTIMO_ESTUDANTE_POSSUI_EMPRESTIMO_ATIVO);
    });

    test('Armário não deve possuir dois empréstimos ativos', async () => {
        await EmprestimoServico.inserir(emprestimo);

        const novoEmprestimo = {
            dataEmprestimo: new Date(),
            dataDevolucao: null,
            id_armario: armario.id,
            id_estudante: estudante.id
        };

        await expect(async () => {
            await EmprestimoServico.inserir(novoEmprestimo);
        }).rejects.toThrow(MensagemUtil.EMPRESTIMO_ARMARIO_POSSUI_EMPRESTIMO_ATIVO);
    });
});
