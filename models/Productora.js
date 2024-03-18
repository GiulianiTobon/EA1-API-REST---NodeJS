const {Schema, model} = require('mongoose');

const ProductoraSchema = Schema({ 
    nombre: {type:String, require: true},
    Estado: {type: String, require: true, enum:['Activo', 'Inactivo']},
    FechaCreacion: {type:Date, require: true},
    FechaActualizacion: {type:Date, require: true},
    Slogan: {type:String, require: true},
    Descripcion: {type:String, require: true}
});

module.exports = model('Productora', ProductoraSchema);