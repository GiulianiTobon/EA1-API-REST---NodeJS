const { validationResult } = require('express-validator');
const Productora = require('../models/Productora');
const { status } = require('express/lib/response');




const postProductora = async function(req, res){

    try{
        const errors = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({mensaje: errors.array()});
        }

        const body = req.body

        const productora = new Productora(body)

        await productora.save()

        return res.status(201).json(productora)
    
    } catch(e){
        return res.status(500).json({
            message: e
        })
    }
}

const getProductora = async function(req, res){
    
    try{
        const productora = await Productora.find();
        res.send(productora);
    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error de conexion');
    }

}

const deleteProductora = async function(req, res){
    
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

        await Productora.findOneAndDelete({nombre: nombre});
        res.send("Eliminado correctamente")        
        console.log("Eliminado Correctamente")

    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error');
    }
}

const putProductora = async function(req, res){

    try{    
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({mensaje: errors.array()});
        }
        const productora = await Productora.findOneAndUpdate(
            { nombre: req.params.Nombre }, // Filtro para encontrar el documento por su nombre
            {
                nombre: req.body.nombre,
                estado: req.body.estado,
                fechaActualizacion: new Date(),
                slogan: req.body.slogan,
                descripcion: req.body.descripcion
            },
            {new: true}
        );
        res.send(productora)
    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error');
    }

};


module.exports = {
    postProductora,
    getProductora,
    deleteProductora,
    putProductora
}