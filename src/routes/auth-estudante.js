const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const levenshtein = require('fast-levenshtein');

const { Estudante } = require('../models');
const { Curso } = require('../models');
const externalization = require('../externalization/request');

router.post('/create/login', async (req, res) => {
  const { ra, password, telefone } = req.body;

  try {
    const user = await Estudante.findOne({ where: { ra } });
    console.log(user);

    if (user) {
      if (await bcrypt.compare(password, user.senha)) {
        const token = jwt.sign({ sestudanteId: user.id, estudanteNome: user.nome }, secret, { expiresIn: '1h' });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Credenciais inválidas' });
      }
    } else {

      const response = await fetch(`${process.env.API_CRONOS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ra: ra,
          senha: password,
        }),
      });

      if (response.status === 401) {
        return res.status(401).json({ error: externalization.invalidCredentials });
      } else if (!response.ok) {
        return res.status(500).json({ error: externalization.cronosAirOut });
      } else {
        const data = await response.json();

        let primeiroNome = data.nome.split(' ')[0];
        let nomeRestante = data.nome.split(' ').slice(1).join(' ');
        let encriptedPassword = await bcrypt.hash(password, 10);

        // const testeVoce = "ENG DE SOFTWARE";
        // const curso = await buscaCursoOuCriaCurso(testeVoce);
        const curso = await buscaCursoOuCriaCurso(data.alunoTurma[0].curso);
        criaEstudante(ra, primeiroNome, nomeRestante, data.email, encriptedPassword, curso.id, telefone);


        //falta retorno apenas seguir aqui
      };
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const buscaCursoOuCriaCurso = async (curso) => {
  try {
    const cursoExistente = await Curso.findOne({ where: { nome: curso } });
    if (cursoExistente) {
      return cursoExistente;
    } else {
      const cursoAproximado = levenshteinMath(curso);
      console.log(cursoAproximado + "returnwu de kev");
      if (cursoAproximado) {
        return cursoAproximado;
      }
    }

    const novoCurso = await Curso.create({ nome: curso, ativo: true });
    return novoCurso;
  } catch (error) {
    console.log(error);
  }
};

const criaEstudante = async (ra, nome, sobrenome, email, senha, cursoId) => {
  console.log(ra, nome, sobrenome, email, senha, cursoId);

  try {
    const estudante = await Estudante.create({ ra, nome, sobrenome, email, senha, cursoId, ativo: true, telefone: "(44) 99826-0968" });
    console.log(estudante);

    return estudante;
  } catch (error) {
    console.log(error);
  }
};

const levenshteinMath = async (curso) => {
  // precisamos de uma busca com tolerancia de erro Acredito que 50% ou 60% de coopatibilidade é o suficiente 
  // ENGENHARIA DE SOFTWARE = 22 letras
  // LICENCIATURA EM QUIMICA = 23 letras
  // ENTRADA = ENG DE SOFTWARE
  // vamos atribuir 0.6 de tolerancia e inserir no banco o a cursos que tenham 60% de compatibilidade no nome 
  //const cursoSimilar = await Curso.findAll({ where: { nome: { [Op.like]: `%${curso}%` } } }); Assim comparariamos strings completa
  const tolerancia = process.env.TOLERANCIA_A_CURSOS;
  let cursos = await Curso.findAll();
  let cursoEncontrado = null;
  let maiorSimilaridade = 0;

  cursos.forEach(cursoBanco => {
    let nomeBanco = cursoBanco.nome;
    let distancia = levenshtein.get(curso, nomeBanco);
    let maxTamanho = Math.max(curso.length, nomeBanco.length);
    let similaridade = 1 - (distancia / maxTamanho);

    if (similaridade > maiorSimilaridade) {
      maiorSimilaridade = similaridade;
      cursoEncontrado = cursoBanco;
    }
  });

  if (maiorSimilaridade >= tolerancia) {
    return cursoEncontrado;
  } else {
    return null;
  }
};




module.exports = router;