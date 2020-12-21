const jwt = require('jsonwebtoken');
const models = require('../models');

const checkToken = async (token) => {
    let userId = null;
    try {
        const { id } = await jwt.decode(token);
        userId = id;
    } catch (error) {
        return false;
    }
    console.log(userId);
    const user = await models.Usuario.findOne({ where: { id: userId, estado: 1 } });
    if (user) {
        const token = jwt.sign({ id: userId }, 'config.secret', { expiresIn: '43200' });
        return { token };
    } else {
        return false;
    }
}


module.exports = {

    //generar el token
    encode: async (user) => {
        const token = jwt.sign({ 
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol
        }, 'config.secret',
          { expiresIn: '43200',
        });
        return token;
    },
    //permite decodificar el token
    decode: async (token) => {
        try {
            const { id } = await jwt.verify(token, 'config.secret');
            const user = await models.Usuario.findOne({ where: { id: id } });
            if (user) {
                return user;
            } else {
                return false;
            }
        } catch (error) {
            const newToken = await checkToken(token);
            return newToken;
        }

    }
}