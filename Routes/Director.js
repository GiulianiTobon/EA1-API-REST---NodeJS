const {Router} = require('express');
const { check, validationResult } = require('express-validator');
const Director = require('../models/Director');
const { status } = require('express/lib/response');


const router = Router();

router.post('/', [ 
    check('nombre','invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo'])  
] ,async function(req, res){
    try{
        const errors = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({mensaje: errors.array()});
        }

        let director = new Director();

        director.nombre = req.body.nombre;
        director.estado = req.body.estado;
        director.fechaCreacion = new Date();
        director.fechaActualizacion = new Date();

        director = await director.save();
        res.send(director);

    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error de conexion');
    }

})


router.get('/', async function(req, res){
    
    try{
        const director = await Director.find();
        res.send(director);
    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error de conexion');
    }

})       


module.exports = router;