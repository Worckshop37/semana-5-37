//import routerx from 'express-promise-router';
const router = require('express').Router();
const usuarioController = require('../controllers/UsuarioController');
//const auth = require('../middlewares/auth');

//const router = routerx();

router.post('/login', usuarioController.login);

module.exports = router;