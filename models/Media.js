const {Schema, model} = require('mongoose');

const MediaSchema = Schema({ 
    Serial:{type:String, require: true, unique: true},
    Titulo: {type:String, require: true},
    Sinopsis: {type:String, require: true},
    Url: {type:String, require: true, unique: true},
    image: {type:String, require: true},
    FechaCreacion: {type:Date, require: true, default: new Date()},
    FechaActualizacion: {type:Date, require: true, default: new Date()},
    AnnoEstreno: {type:Date, require: true},
    GeneroPrincipal: {type:Schema.Types.ObjectId, ref:"Genero", require: true},
    nombreGenero:{type:String},
    Director: {type:Schema.Types.ObjectId, ref:"Director", require: true},
    nombreDirector :{type:String},
    Productora: {type:Schema.Types.ObjectId, ref:"Productora", require: true},
    nombreProductora: {type:String},
    Tipo: {type:Schema.Types.ObjectId, ref:"Tipo", require: true},
    nombreTipo: {type:String}
});

module.exports = model('Media', MediaSchema);