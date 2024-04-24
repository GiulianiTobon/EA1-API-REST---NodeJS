const mongoose = require('mongoose')


const getConnection = async () => {
    try{
        const url = 'mongodb+srv://giulianis118:dxXucvNmGrx0AaAx@medias.q5zwm6h.mongodb.net/'
        await mongoose.connect(url)
        console.log("Conexion Exitosa")
    }catch(error){
        console.log(error)
    }
}

module.exports = {getConnection}