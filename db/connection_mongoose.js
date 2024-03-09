const mongoose = require('mongoose')


const getConnection = async () => {
    try{
        const url = 'mongodb+srv://giulianis118:<koutaS118>@cluster0.s3lmg0a.mongodb.net/'
        await mongoose.connect(url)
        console.log("Conexion Exitosa")
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    getConnection
}