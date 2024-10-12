const { Curso } = require("../models");
const levenshtein = require("fast-levenshtein");

const levenshteinMath = async (curso) => {
    // Precisamos de uma busca com tolerância de erro. Acredito que 50% ou 60% de compatibilidade é o suficiente
    // ENGENHARIA DE SOFTWARE = 22 letras
    // LICENCIATURA EM QUIMICA = 23 letras
    // ENTRADA = ENG DE SOFTWARE
    // Vamos atribuir 0.6 de tolerância e buscar cursos que tenham 60% de compatibilidade no nome

    try {
        const tolerancia = parseFloat(process.env.TOLERANCIA_A_CURSOS) || 0.6;
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
    } catch (error) {
        throw new Error(`Erro na comparação de cursos: ${error.message}`);
    }
};

module.exports = levenshteinMath;
