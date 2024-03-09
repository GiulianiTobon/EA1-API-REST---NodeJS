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

app.use('/Genero', require('./router/Genero'));
app.use('/Director', require('./router/Director'));
app.use('/Productora', require('./router/Productora'));
app.use('/Tipo', require('./router/Tipo'));
app.use('/Media', require('./router/Media'));

app.listen(port, host, () => {
    console.log('Example app listening on port ${port}')
});
