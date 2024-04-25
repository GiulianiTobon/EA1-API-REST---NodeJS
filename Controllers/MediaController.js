const { validationResult } = require("express-validator");
const Media = require("../models/Media");
const { status } = require("express/lib/response");
const Director = require("../models/Director");
const Genero = require("../models/Genero");
const Productora = require("../models/Productora");
const Tipo = require("../models/Tipo");

const postMedia = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ mensaje: errors.array() });
    }
    /*
    const existeMediaPorSerial = await Media.findOne({
      serial: req.body.serial,
    });
    if (existeMediaPorSerial) {
      return res.status(400).send("El serial ya existe en la base de datos");
    }*/
    const existeMediaPorURL = await Media.findOne({ URL: req.body.Url });
    if (existeMediaPorURL) {
      return res.status(400).send("El URL ya existe en la base de datos");
    }
    /*
        const body = req.body

        const media = new Media(body)

        await media.save()

        return res.status(201).json(media)
        */

        let media = new Media();

        media.Serial = req.body.Serial;
        media.Titulo = req.body.Titulo;
        media.Sinopsis = req.body.Sinopsis;
        media.Url = req.body.url;
        media.image = req.body.image;
        media.fechaCreacion = new Date();
        media.fechaActualizacion = new Date();
        media.AnnoEstreno = req.body.AnnoEstreno;
        const genero = await Genero.findOne({ nombre: req.body.Genero });
        if(genero){
            media.GeneroPrincipal = genero._id;
            media.nombreGenero = genero.nombre;
        }
        const director = await Director.findOne({ nombre: req.body.Director });
        if (director) {
            media.Director= director._id;
            media.nombreDirector = director.nombre;
        }
        const productora = await Productora.findOne({nombre: req.body.Productora});
        if (productora) {
            media.Productora = productora._id;
            media.nombreProductora = productora.nombre;
        }
        const tipo = await Tipo.findOne({ nombre: req.body.Tipo });
        if(tipo){
            media.Tipo = tipo._id;
            media.nombreTipo = tipo.Nombre;
        }
        media = await media.save();
        res.send(media);
    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error de conexion");
    }
};

const getMedia = async function (req, res) {
  try {
    const media = await Media.find();
    res.send(media);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error de conexion");
  }
};

const deleteMedia = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ mensaje: errors.array() });
    }
    /*
        const {nombre} = req.params;
        
        await genero.findOneAndDelete({
            nombre: nombre
        })
       */

    await Media.findOneAndDelete({ serial: serial });
    res.send("Eliminado correctamente");
    console.log("Eliminado Correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error");
  }
};

const putMedia = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ mensaje: errors.array() });
    }
    const media = await Media.findOneAndUpdate(
      { serial: req.params.Serial }, // Filtro para encontrar el documento por su nombre
      {
        Titulo: req.body.Titulo,
        Sinopsis: req.body.Sinopsis,
        Url: req.body.URL,
        image: req.body.image,
        fechaActualizacion: new Date(),
        AnnoEstreno: req.body.AnnoEstreno,
        GeneroPrincipal: req.body.Genero._id,
        Productora: req.body.Productora._id,
        Tipo: req.body.Tipo._id,
      },
      { new: true }
    );
    res.send(media);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error");
  }
};

module.exports = {
  postMedia,
  getMedia,
  deleteMedia,
  putMedia,
};
