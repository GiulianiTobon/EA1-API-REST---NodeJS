const {Router} = require('express');
const { check, validationResult } = require('express-validator');
const Media = require('../models/Media');
const { status } = require('express/lib/response');


const router = Router();

router.post('/', [ 
    check('Titulo','invalid.Titulo').not().isEmpty(),
    check('Sinopsis','invalid.Sinopsis').not().isEmpty(),
    check('image','invalid.image').not().isEmpty(),
    check('AnnoEstreno','invalid.AnnoEstreno').not().isEmpty(),
    check('GeneroPrincipal','invalid.GeneroPrincipal').not().isEmpty(),
    check('DirectorPrincipal','invalid.DirectorPrincipal').not().isEmpty(),
    check('Productora','invalid.Prodcutora').not().isEmpty(),
    check('Tipo','invalid.Tipo').not().isEmpty(),  
] ,async function(req, res){
    try{
        const errors = validationResult(req);
        if(!error.isEmpty()){
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

        /* const productoraEstaActiva = await Media.filter({Productora} => {
            if (productoraEstaActiva != 'Activa'){
            return res.status(400).send('La productora no se encuentra activa')}}
        */
            

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

})


router.get('/', async function(req, res){
    
    try{
        const media = await Media.find();
        res.send(media);
    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error de conexion');
    }

})

module.exports = router;