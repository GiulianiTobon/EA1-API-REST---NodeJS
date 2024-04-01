const { validationResult } = require('express-validator');
const Media = require('../models/Media');
const { status } = require('express/lib/response');




const postMedia = async function(req, res){
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({mensaje: errors.array()});
        }

        const existeMediaPorSerial = await Media.findOne({serial: req.body.serial});
            if(existeMediaPorSerial){
                return res.status(400).send('El serial ya existe en la base de datos');
            }
        const existeMediaPorURL = await Media.findOne({URL: req.body.Url});
            if(existeMediaPorURL){
                return res.status(400).send('El URL ya existe en la base de datos');
            }
            

        let media = new Media();

        media.Serial = req.body.Serial;
        media.Titulo = req.body.Titulo;
        media.Sinopsis = req.body.Sinopsis;
        media.Url = req.body.URL;
        media.image = req.body.image;
        media.fechaCreacion = new Date();
        media.fechaActualizacion = new Date();
        media.AnnoEstreno = req.body.AnnoEstreno;
        media.GeneroPrincipal = req.body.Genero._id;
        media.Productora = req.body.Productora._id;        
        media.Tipo = req.body.Tipo._id;

        media = await media.save();
        res.send(media);

    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error de conexion');
    }
}

const getMedia = async function(req, res){
    
    try{
        const media = await Media.find();
        res.send(media);
    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error de conexion');
    }
}

const deleteMedia = async function(req, res){

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

        await Media.findOneAndDelete({serial: serial});
        res.send("Eliminado correctamente")        
        console.log("Eliminado Correctamente")

    }catch(error){

        console.log(error);
        res.status(500).send('Ha ocurrido un error');

    }
}

const putMedia = async function(req, res){

    try{    
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({mensaje: errors.array()});
        }
        const media = await Media.findOneAndUpdate(
            { serial: req.params.Serial }, // Filtro para encontrar el documento por su nombre
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
        res.send(media)
    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error');
    }

};

module.exports = {
    postMedia,
    getMedia,
    deleteMedia,
    putMedia
}