const {Schema, model} = require('mongoose');

const DirectorSchema = Schema({ 
    nombre: {type:String, require: true},
    Estado: {type: String, require: true, enum:['Activo', 'Inactivo'], default: "Activo"},
    FechaCreacion: {type:Date, require: true},
    FechaActualizacion: {type:Date, require: true}
});

module.exports = model('Director', DirectorSchema);