const { validationResult } = require('express-validator');
const Genero = require('../models/Genero');
const { status } = require('express/lib/response');

const postGenders =  async function (req, res){
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({mensaje: errors.array()});
        }

        const body = req.body

        const genero = new Genero(body)

        await genero.save()

        return res.status(201).json(genero)
    
    } catch(e){
        return res.status(500).json({
            message: e
        })
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
        const id = req.params.id

        await Genero.findByIdAndDelete(id)

        return res.status(204).json({
            message: "Borrado con exito"
        })

    } catch(error){
        return res.status(500).json({
            message: error
        })
    }

};

const putGenders = async function(req, res){

    try{    
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({mensaje: errors.array()});
        }

        const id = req.params.id
            const body = req.body
            console.log(body)
            body.fechaActualizacion = new Date()
            const genero = await Genero.findByIdAndUpdate(id, body, {new: true})
            return res.status(201).json(genero)
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