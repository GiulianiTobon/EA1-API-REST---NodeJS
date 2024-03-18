const {Router} = require('express');
const {check ,  validationResult } = require('express-validator');
const Tipo = require('../models/Tipo');
const { status } = require('express/lib/response');


const router = Router();

router.post('/', [ 
    check('nombre','invalid.nombre').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty()  
] ,async function(req, res){
    try{
        const errors = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({mensaje: errors.array()});
        }

        let tipo = new Tipo();

        tipo.nombre = req.body.nombre;        
        tipo.fechaCreacion = new Date();
        tipo.fechaActualizacion = new Date();
        tipo.descripcion = req.body.descripcion;

        tipo = await tipo.save();
        res.send(tipo);

    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error de conexion');
    }

})


router.get('/', async function(req, res){
    
    try{
        const tipo = await Tipo.find();
        res.send(tipo);
    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error de conexion');
    }

})


module.exports = router;