const {Router} = require('express');
const { check} = require('express-validator');
const generoControllers = require('../Controllers/GeneroController')

const router = Router();


//Creación de los elementos en DB Genero
router.post('/', [ 
    check('nombre','invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check('descripcion', 'invalid.descripcion').not().isEmpty()    
    ] ,generoControllers.postGenders);

//Obtención de los generos existentes
router.get('/', generoControllers.getGenders);      

//Eliminación de un genero
router.delete('/:Nombre', generoControllers.deleteOneGenders);

//Actualizar el genero
router.put('/:Nombre', [
    check('nombre','invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check('descripcion', 'invalid.descripcion').not().isEmpty()
], generoControllers.putGenders)
module.exports = router;