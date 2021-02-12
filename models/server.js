const express = require('express');
const cors = require('cors');

const {dbConnection} = require('../database/config')

const app = express()
 

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Conectar a base de datos
        this.conectarBD();

        //middlewares
        this.middlewares();
        //Rutas de mi aplicación
        this.routes();
        
    }

    async conectarBD(){
        await dbConnection();
    }


    middlewares(){
        // CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio Público
        this.app.use(express.static('public'));
    }

    routes(){
        
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }

}



module.exports = Server;