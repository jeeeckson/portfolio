import express from "express";
import cors from "cors";
import React from "react";
import {renderToString} from "react-dom/server";
import serverRender from './serverRendering/serverRender';

require('reflect-metadata');
const bodyParser = require('body-parser');
const {createConnection} = require('typeorm');
const logger = require('./winston-configurer');
const errorHandler = require('./errorHandler');
const onError = require('./onError');
const allowCrossDomain = require('./allowCrossDomain');
const userRoute = require('./routes/userRoute');
const app = express();
const http = require('http');

createConnection().then(() => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cors());
    app.use(allowCrossDomain);
    app.use(express.static("public"));
    app.get("*", serverRender);
    // error handler
    app.use(errorHandler);

    /**
     * Create HTTP server.
     */
    app.set('port', 3000);
    let server = http.createServer(app);
    server.listen(3000);
    logger.info('App Initialized');
    server.on('error', onError);

});