const {Router} = require('express');
const { check } = require('express-validator');
const ProductoraController = require('../Controllers/ProductoraController')


const router = Router();

router.post('/', [ 
    check('nombre','invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check('slogan', 'invalid.slogan').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty()  
] , ProductoraController.postProductora);

router.get('/', ProductoraController.getProductora);

router.delete('/',ProductoraController.deleteProductora);

router.put('/',[
    check('nombre','invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check('slogan', 'invalid.slogan').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty()
], ProductoraController.putProductora);

module.exports = router;