const models = require('../models');

module.exports = {
    list: async(req, res, next) => {
        try {
            const lista = await models.Categoria.findAll();
            res.status(200).json(lista);
        } catch (error) {
            res.status(500).send({ message: 'No se pudo establecer la conexion, intente mas tarde' });
            next(error);
        }
    },

    add: async(req, res, next) => {
        try {
            const nuevaCategoria = await models.Categoria.create(req.body);
            res.status(200).json(nuevaCategoria);
        } catch (error) {
            res.status(500).send({ message: 'No se pudo establecer la conexion, intente mas tarde' });
            next(error);
        }
    },

    update: async(req, res, next) => {
        try {
            const updateCategoria = await models.Categoria.update({ nombre: req.body.nombre, descripcion: req.body.descripcion }, { where: { id: req.body.id } });
            res.status(200).json(updateCategoria);
        } catch (error) {
            res.status(500).send({ message: 'No se pudo establecer la conexion, intente mas tarde' });
            next(error);
        }
    },

    activate: async(req, res, next) => {
        try {
            console.log(req.body.id);
            const activateCategoria = await models.Categoria.update({ estado: 1 }, { where: { id: req.body.id } });
            res.status(200).json(activateCategoria);
        } catch (error) {
            res.status(500).send({ message: 'No se pudo establecer la conexion, intente mas tarde' });
            next(error);
        }
    },

    deactivate: async(req, res, next) => {
        try {
            const deactivateCategoria = await models.Categoria.update({ estado: 0 }, { where: { id: req.body.id } });
            res.status(200).json(deactivateCategoria);
        } catch (error) {
            res.status(500).send({ message: 'No se pudo establecer la conexion, intente mas tarde' });
            next(error);
        }
    }
}