const {Router} = require('express');
const {check} = require('express-validator');
const ControllerTipo = require('../Controllers/TipoController');



const router = Router();

router.post('/', [ 
    check('nombre','invalid.nombre').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty()  
] , ControllerTipo.postTipo);

router.get('/', ControllerTipo.getTipo);

router.delete('/', ControllerTipo.deleteTipo);

router.put('/', ControllerTipo.putTipo);

module.exports = router;