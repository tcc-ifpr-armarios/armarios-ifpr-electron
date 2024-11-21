const Curso = require('../models/curso');
const externalization = require('../externalization/request');

const createCurso = async (req, res) => {
    const { nome, ativo } = req.body;

    try {
        const curso = await Curso.create({ nome, ativo });
        res.status(201).json({ message: externalization.successCreatingCourse });
    } catch (error) {
        res.status(500).json({ error: externalization.errorCreatingCourse });
    }
};


const getCursos = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const offset = (pageNumber - 1) * limitNumber;

    try {
        const { count, rows } = await Curso.findAndCountAll({
            limit: limitNumber,
            offset: offset,
            order: [['nome', 'ASC']]
        });

        const totalPages = Math.ceil(count / limitNumber);

        res.status(200).json({
            data: rows,
            pagination: {
                totalItems: count,
                totalPages: totalPages,
                currentPage: pageNumber,
                itemsPerPage: limitNumber
            }
        });
    } catch (error) {
        res.status(500).json({ error: externalization.errorFetchingCourse });
    }
};

const getCursoById = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await Curso.findByPk(id);
        if (curso) {
            res.status(200).json(curso);
        } else {
            res.status(404).json({ error: externalization.notFoundCourse });
        }
    } catch (error) {
        res.status(500).json({ error: externalization.errorFetchingCourse });
    }
};

const updateCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, ativo } = req.body;
        const curso = await Curso.findByPk(id);
        if (curso) {
            await curso.update({ nome, ativo });
            res.status(200).json({ message: externalization.successEditingCourse });
        } else {
            res.status(404).json({ error: externalization.notFoundCourse });
        }
    } catch (error) {
        res.status(500).json({ error: externalization.errorEditingCourse });
    }
};

const deleteCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await Curso.findByPk(id);
        if (curso) {
            await curso.destroy();
            res.status(200).json({ message: externalization.successDeletingCourse });
        } else {
            res.status(404).json({ error: externalization.notFoundCourse });
        }
    } catch (error) {
        res.status(500).json({ error: externalization.errorDeletingCourse });
    }
};



module.exports = {
    createCurso,
    getCursos,
    getCursoById,
    updateCurso,
    deleteCurso
};