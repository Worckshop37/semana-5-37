//import routerx from 'express-promise-router';
const router = require('express').Router();
const usuarioController = require('../controllers/UsuarioController');
//const auth = require('../middlewares/auth');

//const router = routerx();

router.get('/list', usuarioController.list);
router.post('/login', usuarioController.login);
router.post('/add', usuarioController.add);
router.put('/update', usuarioController.update);
router.put('/activate', usuarioController.activate);
router.put('/deactivate', usuarioController.deactivate);

module.exports = router;