const { validationResult } = require('express-validator');
const Tipo = require('../models/Tipo');
const { status } = require('express/lib/response');


const postTipo = async function(req, res){
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
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
}

const getTipo = async function(req, res){
    
    try{
        const tipo = await Tipo.find();
        res.send(tipo);
    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error de conexion');
    }

}

const deleteTipo = async function(req, res){
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

        await Media.findOneAndDelete({nombre: nombre});
        res.send("Eliminado correctamente")        
        console.log("Eliminado Correctamente")

    }catch(error){

        console.log(error);
        res.status(500).send('Ha ocurrido un error');

    }
}

const putTipo = async function(req, res){
    try{
        
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({mensaje: errors.array()});
        }

        const tipo = await Tipo.findOneAndUpdate(
            { nombre: req.params.Nombre }, // Filtro para encontrar el documento por su nombre
            {
                Titulo: req.body.Titulo,
                Sinopsis: req.body.Sinopsis,
                Url: req.body.URL,
                image: req.body.image,
                fechaActualizacion : new Date(),
                AnnoEstreno : req.body.AnnoEstreno,
                GeneroPrincipal : req.body.Genero._id,
                Productora : req.body.Productora._id,       
                Tipo: req.body.Tipo._id
            },
            {new: true}
        );
        res.send(tipo)

    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error de conexion');
    }

}


module.exports = {
    postTipo,
    getTipo,
    deleteTipo,
    putTipo
}