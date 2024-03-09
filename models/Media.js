const {Schema, model} = require('mongoose');

const MediaSchema = Schema({ 
    Serial:{type:String, require: true, unique: true},
    Titulo: {type:String, require: true},
    Sipnosis: {type:String, require: true},
    Url: {type:String, require: true, unique: true},
    image: {type:String, require: true},
    FechaCreacion: {type:Date, require: true},
    FechaActualizacion: {type:Date, require: true},
    AnnoEstreno: {type:Date, require: True},
    GeneroPrincipal: {type:Schema.Types.ObjectId, ref:"Genero", require: true},
    Director: {type:Schema.Types.ObjectId, ref:"Director", require: true},
    Productora: {type:Schema.Types.ObjectId, ref:"Productora", require: true},
    Tipo: {type:Schema.Types.ObjectId, ref:"Tipo", require: true},
});

module.exports = model('Media', MediaSchema);