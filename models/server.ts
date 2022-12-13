import express, { Application } from 'express';
import cors from 'cors';
import routerUsuarios from '../routes/usuarios';
import db from '../database/connection';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '4000';

        this.dbConnection();

        this.middlewares(); 
        this.routes();
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Conexión realizada con éxito');
        } catch (error) {
            throw new Error(String(error));
        }
    }

    routes(){
        this.app.use(this.apiPaths.usuarios, routerUsuarios)
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Listening at ' + this.port);
        });
    }

}

export default Server;