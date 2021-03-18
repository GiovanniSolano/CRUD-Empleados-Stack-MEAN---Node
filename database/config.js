const mongoose = require('mongoose');


const DBconnection = async() => {


    try {

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        console.log('Conexión exitosa');


    } catch (error) {
        console.log(error);
        throw new Error('Error al inicial la BD, ver logs');


    }

}

module.exports = {
    DBconnection
};