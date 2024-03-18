const express = require('express');
const {getConnection} = require('./db/conection_Mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const host = '0.0.0.0';
const port = process.env.PORT;

app.use(cors());

getConnection();


//parseo JSON

app.use(express.json());

app.use('/Genero', require('./Routes/Genero'));
app.use('/Director', require('./Routes/Director'));
app.use('/Productora', require('./Routes/Productora'));
app.use('/Tipo', require('./Routes/Tipo'));
app.use('/Media', require('./Routes/Media'));

app.listen(port, host, () => {
    console.log('Example app listening on port ${port}')
});
