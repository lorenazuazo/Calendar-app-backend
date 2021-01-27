const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

//ver los procesos corriendo
//console.log(process.env);

//crear serviror express
const app= express();

//base de datos
dbConnection();

//cors
app.use(cors());

//lectura y parseo del body
app.use(express.json());

//directorio publico
app.use(express.static('public'));

//Rutas
app.use('/api/auth',require('./routes/auth'));


//escuchar peticiones por el puerto 4000-puede ser 
//cualquiera mientras no sea el mismo que el del front

app.listen(process.env.PORT, () => {
    console.log(`servior corriendo en puerto ${process.env.PORT}`);
});
