/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
//import routerx from 'express-promise-router';
const router = require('express').Router();
const articuloController = require('../controllers/ArticuloController');
const auth = require('../middlewares/auth');

//const router = routerx();

router.get('/list', articuloController.list);
router.post('/add', articuloController.add);
router.put('/update', articuloController.update);
router.put('/activate', articuloController.activate);
router.put('/deactivate', articuloController.deactivate);

module.exports = router;