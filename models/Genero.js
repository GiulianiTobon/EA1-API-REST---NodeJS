const {Schema, model} = require('mongoose');



const GeneroSchema = Schema({
    nombre: {
        type: String,
        unique: [true, 'nombre es único'],
        minLength: 1
    },
    estado: {
        type: String,
        default: true,
        required: true,
        enum:["Activo", "Inactivo"]
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    },
    descripcion: {
        type: String
    },
})

module.exports = model('Genero', GeneroSchema);