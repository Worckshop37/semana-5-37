const models = require('../models');
const Categoria = require('../models').Categoria;

module.exports = {
    list: async(req, res, next) => {
        try {
            const lista = await models.Articulo.findAll({ include: [{ model: Categoria, as: 'categoria' }], });
            res.status(200).json(lista);
        } catch (error) {
            res.status(500).send({ message: 'No se pudo establecer la conexion, intente mas tarde' });
            next(error);
        }
    },

    add: async(req, res, next) => {
        try {
            const nuevoArticulo = await models.Articulo.create(req.body);
            res.status(200).json(nuevoArticulo);
        } catch (error) {
            res.status(500).send({ message: 'No se pudo establecer la conexion, intente mas tarde' });
            next(error);
        }
    },

    update: async(req, res, next) => {
        try {
            console.log(req.body);
            const articuloUpdate = await models.Articulo.update({ categoriaId: req.body.categoria, codigo: req.body.codigo, nombre: req.body.nombre, descripcion: req.body.descripcion }, { where: { id: req.body.id } });
            res.status(200).json(articuloUpdate);
        } catch (error) {
            res.status(500).send({ message: 'No se pudo establecer la conexion, intente mas tarde' });
            next(error);
        }
    },

    activate: async(req, res, next) => {
        try {
            const articuloActivate = await models.Articulo.update({ estado: 1 }, { where: { id: req.body.id} });
            res.status(200).json(articuloActivate);
        } catch (error) {
            res.status(500).send({ message: 'No se pudo establecer la conexion, intente mas tarde' });
            next(error);
        }
    },

    deactivate: async(req, res, next) => {
        try {
            const articuloDeactivate = await models.Articulo.update({ estado: 0 }, { where: { id: req.body.id } });
            res.status(200).json(articuloDeactivate);
        } catch (error) {
            res.status(500).send({ message: 'No se pudo establecer la conexion, intente mas tarde' });
            next(error);
        }
    },
}