
const jwt = require('jsonwebtoken');
require('dotenv').config();
const levenshtein = require('fast-levenshtein');

const { Estudante, Curso} = require('../models');
const externalization = require('../externalization/request');
const levenshteinMath = require("../utils/levenshtein");
const MensagemUtil = require("../utils/MensagemUtil");
const {converteSenhaParaSha256Hex} = require("../utils/autenticacaoUtil");


async function criaEstudanteCronos(ra, senha, telefone) {
  try {
    const user = await Estudante.findOne({ where: { ra } });
    if (user) {
      return { sucesso: false, cadastrado: true, mensagem: MensagemUtil.ESTUDANTE_JA_CADASTRADO };
    } else {
      const response = await cronosRequisicao(ra, senha);
      if (response.status === 401) {
        return { sucesso: false, mensagem: MensagemUtil.LOGIN_SENHA_INCORRETA };
      } else if (!response.ok) {
        return { sucesso: false, mensagem: MensagemUtil.CRONOS_AIR_OUT };
      } else {
        const data = await response.json();
        let primeiroNome = data.nome.split(' ')[0];
        let nomeRestante = data.nome.split(' ').slice(1).join(' ');
        let encriptedPassword = converteSenhaParaSha256Hex(senha);
        // const testeVoce = "ENG DE SOFTWARE";
        // const curso = await buscaCursoOuCriaCurso(testeVoce);
        try {
          const curso = await buscaCursoOuCriaCurso(data.alunoTurma[0].curso);
          console.log(curso.id);
          const estudante = await criaEstudante(ra, primeiroNome, nomeRestante, data.email, encriptedPassword, curso.id, telefone);
          return { sucesso: true, mensagem: MensagemUtil.CRONOS_SUCESSO };
        } catch (innerError) {
          return { sucesso: false, mensagem: innerError.message };
        }
      }
    }
  } catch (error) {
    return { sucesso: false, mensagem: error.message };
  }
};

const buscaCursoOuCriaCurso = async (curso) => {
  try {
    const cursoExistente = await Curso.findOne({ where: { nome: curso } });
    if (cursoExistente) {
      return cursoExistente;
    } else {
      const cursoAproximado = await levenshteinMath(curso);
      if (cursoAproximado) {
        return cursoAproximado;
      }
    }

    const novoCurso = await Curso.create({ nome: curso, ativo: true });

    return novoCurso;
  } catch (error) {
    throw new Error(`Erro ao buscar ou criar curso: ${error.message}`);
  }
};

const criaEstudante = async (ra, nome, sobrenome, email, senha, id_curso, telefone) => {
  try {
    const estudante = await Estudante.create({ ra, nome, sobrenome, email, senha, id_curso, ativo: true, telefone });
    return estudante;
  } catch (error) {
    throw new Error(`Erro ao criar estudante: ${error.message}`);
  }
};



const cronosRequisicao = async (ra, senha) => {
  try {
    const response = await fetch(`${process.env.API_CRONOS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ra: ra,
        senha: senha,
      }),
    });
    return response;
  } catch (error) {
    throw new Error(`Erro na requisição ao Cronos: ${error.message}`);
  }
}



module.exports = criaEstudanteCronos;



// if (await bcrypt.compare(senha, user.senha)) {
//   const token = jwt.sign({ sestudanteId: user.id, estudanteNome: user.nome }, secret, { expiresIn: '1h' });
//   res.status(200).json({ token });
// } else {
//   res.status(401).json({ error: 'Credenciais inválidas' });
// }