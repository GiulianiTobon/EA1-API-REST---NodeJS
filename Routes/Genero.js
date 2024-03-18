const {Router} = require('express');
const { check, validationResult } = require('express-validator');
const Genero = require('../models/Genero');
const { status } = require('express/lib/response');

const router = Router();


//Creación de los elementos en DB Genero
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

});

//Obtención de los generos existentes
router.get('/Generos', async function(req, res){
    
    try{
        const genero = await Genero.find();
        res.send(genero);
    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error de conexion');
    }

})       

//Eliminación de los generos

module.exports = router;