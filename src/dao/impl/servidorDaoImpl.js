const Servidor = require('../../models/servidor');
const MensagemUtil = require('../../utils/mensagemUtil');
const { Op } = require('sequelize');
const ServidorDao = require('../servidorDao');
class ServidorDaoImpl extends ServidorDao {

  async buscarTodosPaginado(numeroPagina, itensPorPagina) {
    const deslocamento = (numeroPagina - 1) * itensPorPagina;

    try {
      const { count, rows } = await Servidor.findAndCountAll({
        limit: itensPorPagina,
        offset: deslocamento,
        order: [['nome', 'ASC']]
      });

      return { count, rows };
    } catch (error) {
      throw new Error(MensagemUtil.SERVIDOR_ERRO_BUSCANDO);
    }
  }

  async buscarUnicoPorEmail(email) {
    try {
      return await Servidor.findOne({
        where: { email }
      });
    } catch (error) {
      throw new Error(MensagemUtil.SERVIDOR_ERRO_BUSCANDO);
    }
  }

  async buscarUnicoPorEmailOuSiape(servidor) {
    try {
        const emailExists = servidor.email ? await Servidor.findOne({ where: { email: servidor.email } }) : null;
        const siapeExists = servidor.siape ? await Servidor.findOne({ where: { siape: servidor.siape } }) : null;
        if(servidor.id){
          if(Number(servidor.id) === Number(siapeExists.id) || Number(servidor.id) === Number(emailExists.id) ){
            return { status: 'sucesso', code: null, message: 'Edição permitida.' };
          }
        }        
        if (emailExists && siapeExists) {
            return { status: 'erro', code: 1, message: 'Email e SIAPE duplicados.' };
        } else if (emailExists) {
            return { status: 'erro', code: 2, message: 'Email duplicado.' };
        } else if (siapeExists) {
            return { status: 'erro', code: 3, message: 'SIAPE duplicado.' };
        } else {
            return { status: 'sucesso', code: null, message: 'Nenhum duplicado encontrado.' };
        }
    } catch (error) {
        throw new Error(MensagemUtil.SERVIDOR_ERRO_BUSCANDO);
    }
}


  async buscarUnicoPorId(id) {
    try {
      return await Servidor.findByPk(id);
    } catch (error) {
      throw new Error(MensagemUtil.SERVIDOR_ERRO_BUSCANDO);
    }
  }

  async atualizar(servidor) {
    try {
        const [numAffectedRows] = await Servidor.update(
            {
                nome: servidor.nome,
                sobrenome: servidor.sobrenome,
                email: servidor.email,
                siape: servidor.siape,
                ativo: servidor.ativo,
                telefone: servidor.telefone,
                ...(servidor.senha && { senha: servidor.senha }),
            },
            { where: { id: servidor.id } }
        );
        return numAffectedRows;
    } catch (error) {
        console.log(error);
        throw new Error(MensagemUtil.SERVIDOR_ATUALIZACAO_ERRO_PADRAO);
    }
}

  async excluir(servidor) {
    try {
      const deleted = await Servidor.destroy({
        where: { id: servidor.id }
      });
      return deleted;
    } catch (error) {
      throw new Error(MensagemUtil.SERVIDOR_EXCLUSAO_ERRO_PADRAO);
    }
  }

  async inserir(servidor) {
    try {
      const novoServidor = await Servidor.create(servidor);
      return novoServidor;
    } catch (error) {
      if(error.name === 'SequelizeUniqueConstraintError'){
        throw new Error(MensagemUtil.SERVIDOR_SIAPE_DUPLICADO);
      }
      throw new Error(MensagemUtil.SERVIDOR_INSERCAO_ERRO_PADRAO);
    }
  }
}

module.exports = ServidorDaoImpl;
