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
}