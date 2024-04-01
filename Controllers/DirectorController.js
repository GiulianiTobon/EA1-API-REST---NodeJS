const { validationResult } = require('express-validator');
const Director = require('../models/Director');
const { status } = require('express/lib/response');

const postDirector = async function(req, res){
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
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

}

const getDirector = async function(req, res){
    
    try{
        const director = await Director.find();
        res.send(director);
    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error de conexion');
    }

}

const deleteDirector = async function(req, res){

    try{
        
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({mensaje: errors.array()});
        }
        /*
        const {nombre} = req.params;
        
        await genero.findOneAndDelete({
            nombre: nombre
        })
       */

        await Director.findOneAndDelete({nombre: nombre});
        res.send("Eliminado correctamente")        
        console.log("Eliminado Correctamente")

    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error');
    }

};

const putDirector = async function(req, res){

    try{    
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({mensaje: errors.array()});
        }
        const director = await Director.findOneAndUpdate(
            { nombre: req.params.Nombre }, // Filtro para encontrar el documento por su nombre
            {
                nombre: req.body.nombre,
                estado: req.body.estado,
                fechaActualizacion: new Date()
            },
            {new: true}
        );
        res.send(director)
    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error');
    }

};

module.exports = {
    postDirector,
    getDirector,
    deleteDirector,
    putDirector
}