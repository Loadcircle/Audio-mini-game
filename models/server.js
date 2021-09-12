const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

class Server{
    constructor(){
        this.app = express();
        this.port = 8080;

        this.paths = {
            saveJson: '/api/saveJson'
        }
        
        this.middlewares();
        this.routes();
    }
    middlewares(){
        //Public folder
        this.app.use(express.static('public'));

        //Read and parse body
        this.app.use(express.json());
        
        this.app.use(cors())

        this.app.use(bodyParser.json({limit: "50mb"}));
        this.app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}))

    }
    routes(){
        this.app.use(this.paths.saveJson, require('../routes/saveJson'))
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Runnin on port '+this.port);
        })
    }
}

module.exports = Server;