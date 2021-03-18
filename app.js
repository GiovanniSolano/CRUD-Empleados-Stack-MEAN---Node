const express = require('express');
const app = express();

const { DBconnection } = require('./database/config');
const cors = require('cors');

// Lectura y parseo del body
app.use(express.json());

// CORS
app.use(cors());

// Base de datos - Conexión
DBconnection();

// Rutas
app.use('/api/empleados', require('./routes/empleados'));



const port = process.env.PORT || 3000;


app.listen(port, () => {

    console.log('Escuchando puerto:', port);


});