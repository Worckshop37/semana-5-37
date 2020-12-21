const models = require('../models');
const bcrypt = require('bcryptjs');
const tokenService = require('../services/token');

module.exports = {
    login: async(req, res, next) => {
        try {
            const user = await models.Usuario.findOne({ where: { email: req.body.email } });
            if(user) {
                const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
                if(passwordIsValid) {
                    const tokenReturn = await tokenService.encode(user);
                    res.status(200).json({ user, tokenReturn });
                } else {
                    res.status(401).send({ message: 'Usuario y/o contraseña invalidos' });
                }
            } else {
                res.status(404).send({ message: 'Usuario y/o contraseña invalidos' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Imposible conectar, intente mas tarde' });
            next(error);
        }
    },

    list: async(req, res, next) => {
        try {
            const lista = await models.Usuario.findAll();
            res.status(200).json(lista);
        } catch (error) {
            res.status(500).send({ message: 'Imposible conectar, intente mas tarde' });
            next(error);
        }
    },

    add: async(req, res, next) => {
        try {
            const nuevoUsuario = await models.Usuario.findOne({ where: { email: req.body.email } });
            if(!nuevoUsuario) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
                const user = await models.Usuario.create(req.body);
                res.status(200).send({ status: 'Usuario creado correctamente', user: user });
            } else {
                res.status(405).json({ error: 'Usuario ya registrado' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Imposible conectar, intente mas tarde' });
            next(error);
        }
    },

    update: async(req, res, next) => {
        try {
            const passwordPast = req.body.password;
            const usuarioRegistrado = await models.Usuario.findOne({ where: { id: req.body.id } });
            if(passwordPast != usuarioRegistrado.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            const usuarioUpdate = await models.Usuario.update({ rol: req.body.rol, nombre: req.body.nombre, email: req.body.email, password: req.body.password }, { where: { id: req.body.id } });
            res.status(200).json(usuarioUpdate);
        } catch (error) {
            res.status(500).send({ message: 'Imposible conectar, intente mas tarde' });
            next(error);
        }
    },

    activate: async(req, res, next) => {
        try {
            const usuarioActivate = await models.Usuario.update({ estado: 1 }, { where: { id: req.body.id } });
            res.status(200).json(usuarioActivate);
        } catch (error) {
            res.status(500).send({ message: 'Imposible conectar, intente mas tarde' });
            next(error);  
        }
    },

    deactivate: async(req, res, next) => {
        try {
            const usuarioDeactivate = await models.Usuario.update({ estado: 0 }, { where: { id: req.body.id } });
            res.status(200).json(usuarioDeactivate);
        } catch (error) {
            res.status(500).send({ message: 'Imposible conectar, intente mas tarde' });
            next(error);  
        }
    },
}