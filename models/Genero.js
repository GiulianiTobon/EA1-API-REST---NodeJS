const {Schema, model} = require('mongoose');


const GeneroSchema = Schema({ 
    nombre: {type:String, require: true},
    Estado: {type: String, require: true, enum:[Activo, Inactivo]},
    FechaCreacion: {type:Date, require: true},
    Descripcion: {type:String, require: true}
});

module.exports = model('Genero', GeneroSchema);