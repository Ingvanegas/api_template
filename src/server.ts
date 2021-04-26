
import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import * as queries from './queries';

export class Server {

   public init = function (configs, db) {
        const app = express();
    
        // config express middlewares
        app.use(compression());
        app.use(helmet());
        app.use(morgan(configs.logger.format));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded());

        
        app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
            res.setHeader('Access-Control-Allow-Credentials', true);
            next();
        });
    
        // setup routes
        queries.init(app, configs, db)
    
        app.use(function (err, req, res, next) {
            console.log(err);
            res.status(500).send(err);
        });
        return app;
    };
}