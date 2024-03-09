const {Router} = require('express');
const { validationResult } = require('express-validator');
const Genero = require('../models/Genero');
const { status } = require('express/lib/response');

const router = Router();

router.post('/', [ 
    check('nombre','invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check('descripcion', 'invalid.descripcion').not().isEmpty()    
] ,async function(req, res){
    try{
        const errors = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({mensaje: errors.array()});
        }

        let genero = new Genero();

        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.fechaCreacion = new Date();
        genero.fechaActualizacion = new Date();
        genero.descripcion = req.body.descripcion;

        genero = await genero.save();
        res.send(genero);

    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error de conexion');
    }

})


router.get('/', async function(req, res){
    
    try{
        const genero = await Genero.find();
        res.send(genero);
    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error de conexion');
    }

})       


module.exports = router;