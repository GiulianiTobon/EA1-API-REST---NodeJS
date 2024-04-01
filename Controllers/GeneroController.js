const { validationResult } = require('express-validator');
const Genero = require('../models/Genero');
const { status } = require('express/lib/response');

const postGenders =  async function (req, res){
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
};

const getGenders = async function(req, res){
    
    try{
        const genero = await Genero.find();
        res.send(genero);
    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error de conexion');
    }

}

const deleteOneGenders = async function(req, res){

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

        await Genero.findOneAndDelete({nombre: nombre});
        res.send("Eliminado correctamente")        
        console.log("Eliminado Correctamente")

    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error');
    }

};

const putGenders = async function(req, res){

    try{    
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({mensaje: errors.array()});
        }
        const genero = await Genero.findOneAndUpdate(
            { nombre: req.params.Nombre }, // Filtro para encontrar el documento por su nombre
            {
                nombre: req.body.nombre,
                estado: req.body.estado,
                fechaActualizacion: new Date(),
                descripcion: req.body.descripcion
            },
            {new: true}
        );
        res.send(genero)
    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error');
    }

};


module.exports = {
    getGenders,
    postGenders,
    deleteOneGenders,
    putGenders
}