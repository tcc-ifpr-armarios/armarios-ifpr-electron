const Emprestimo = require('../../models/Emprestimo');
const MensagemUtil = require('../../utils/mensagemUtil');
const { Op } = require('sequelize');
const EmprestimoDao = require('../EmprestimoDao');

class EmprestimoDaoImpl extends EmprestimoDao {
  async atualizar(emprestimo) {
    try {
      const [numAffectedRows] = await Emprestimo.update(
        {
          // Adapte os campos conforme o modelo Emprestimo
          dataEmprestimo: emprestimo.dataEmprestimo,
          dataDevolucao: emprestimo.dataDevolucao,
          ativo: emprestimo.ativo,
        },
        { where: { id: emprestimo.id } }
      );
      return numAffectedRows;
    } catch (error) {
      console.log(error);
      throw new Error(MensagemUtil.EMPRESTIMO_ATUALIZACAO_ERRO_PADRAO);
    }
  }

  async buscarAtivoPorRaDoEstudante(ra) {
    try {
      return await Emprestimo.findOne({
        where: {
          raEstudante: ra,
          ativo: true
        }
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_EMPRESTIMO);
    }
  }

  async buscarAtivoPorIdArmario(idArmario) {
    try {
      return await Emprestimo.findOne({
        where: {
          idArmario,
          ativo: true
        }
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_EMPRESTIMO);
    }
  }

  async buscarAtivosPorIdLocalizacao(id_localizacao) {
    try {
      return await Emprestimo.findAll({
        where: {
          id_localizacao,
          ativo: true
        }
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_EMPRESTIMO);
    }
  }

  async buscarTodos() {
    try {
      return await Emprestimo.findAll();
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_EMPRESTIMO);
    }
  }

  async buscarTodosPorIdLocalizacao(idLocalizacao) {
    try {
      return await Emprestimo.findAll({
        where: { idLocalizacao }
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_EMPRESTIMO);
    }
  }

  async buscarTodosPorRaDoEstudante(ra) {
    try {
      return await Emprestimo.findAll({
        where: { raEstudante: ra }
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_EMPRESTIMO);
    }
  }

  async buscarTodosPorIdArmario(idArmario) {
    try {
      return await Emprestimo.findAll({
        where: { idArmario }
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_EMPRESTIMO);
    }
  }

  async buscarUnicoPorId(identificador) {
    try {
      return await Emprestimo.findByPk(identificador);
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_BUSCAR_EMPRESTIMO);
    }
  }

  async excluir(emprestimo) {
    try {
      const deleted = await Emprestimo.destroy({
        where: { id: emprestimo.id }
      });
      return deleted;
    } catch (error) {
      throw new Error(MensagemUtil.EMPRESTIMO_EXCLUSAO_ERRO_PADRAO);
    }
  }

  async inserir(emprestimo) {
    try {
      const novoEmprestimo = await Emprestimo.create(emprestimo);
      return novoEmprestimo;
    } catch (error) {
      console.log(error);
      throw new Error(MensagemUtil.EMPRESTIMO_INSERCAO_ERRO_PADRAO);
    }
  }

  async quantidadeEmprestimosAtivos() {
    try {
      return await Emprestimo.count({
        where: { ativo: true }
      });
    } catch (error) {
      throw new Error(MensagemUtil.ERRO_CONTAR_EMPRESTIMOS_ATIVOS);
    }
  }
}

module.exports = EmprestimoDaoImpl;
