const {Router} = require('express');
const { check} = require('express-validator');
const directorController = require('../Controllers/DirectorController')
const { status } = require('express/lib/response');


const router = Router();

router.post('/', [ 
    check('nombre','invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo'])  
], directorController.postDirector);

router.get('/', directorController.getDirector);       

router.delete('/', directorController.deteleDirector)

router.put('/', [
    check('nombre','invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo'])],
    directorController.putDirector);
module.exports = router;