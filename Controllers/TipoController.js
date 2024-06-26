const { validationResult } = require('express-validator');
const Tipo = require('../models/Tipo');
const { status } = require('express/lib/response');


const postTipo = async function(req, res){
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({mensaje: errors.array()});
        }

        const body = req.body

        const tipo = new Tipo(body)

        await tipo.save()

        return res.status(201).json(tipo)
    
    } catch(e){
        return res.status(500).json({
            message: e
        })
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
                Nombre: req.body.Nombre,
                fechaActualizacion : new Date(),
                Descripcion: req.body.Descripcion                
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