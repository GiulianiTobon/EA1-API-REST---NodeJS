const {Schema, model} = require('mongoose');

const TipoSchema = Schema({ 
    nombre: {type:String, require: true},
    FechaCreacion: {type:Date, require: true},
    FechaActualizacion: {type:String, require: true},
    Descripcion: {type:String, require: true}
});

module.exports = model('Tipo', TipoSchema);