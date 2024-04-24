const {Schema, model} = require('mongoose');

const ProductoraSchema = Schema({ 
    nombre: {type:String, require: true},
    Estado: {type: String, require: true, enum:['Activo', 'Inactivo']},
    FechaCreacion: {type:Date, default: new Date()},
    FechaActualizacion: {type:Date, default: new Date()},
    Slogan: {type:String, require: true},
    Descripcion: {type:String}
});

module.exports = model('Productora', ProductoraSchema);