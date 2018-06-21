// Express requirements
import express from 'express';
import Loadable from 'react-loadable';
import 'reflect-metadata';
import webpack from 'webpack';
import {isDebug} from '../config/app';
import initExpress from './init/express';
import initRoutes from './init/routes';
import renderMiddleware from './render/middleware';
import {User} from './entities/User';
import {Event} from "./entities/Event";

const {createConnection} = require('typeorm');
const app = express();

createConnection({
    "name": "default",
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "root",
    "database": "portfolio",
    "autoSchemaSync": true,
    "entities": [
        User, Event
    ],
    "synchronize": true,
    "logging": true
}).then(() => {

    /*
     * REMOVE if you do not need passport configuration
     */
    //initPassport();

    if (isDebug) {
        // enable webpack hot module replacement
        const webpackDevMiddleware = require('webpack-dev-middleware');
        const webpackHotMiddleware = require('webpack-hot-middleware');
        const webpackConfig = require('../webpack/webpack.config');
        const devBrowserConfig = webpackConfig({browser: true});
        const compiler = webpack(devBrowserConfig);
        app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: devBrowserConfig.output.publicPath}));
        app.use(webpackHotMiddleware(compiler));
    }

    /*
     * Bootstrap application settings
     */
    initExpress(app);

    /*
     * REMOVE if you do not need any routes
     *
     * Note: Some of these routes have passport and database model dependencies
     */
    initRoutes(app);

    /*
     * This is where the magic happens. We take the locals data we have already
     * fetched and seed our stores with data.
     * renderMiddleware matches the URL with react-router and renders the app into
     * HTML
     */
    app.get('*', renderMiddleware);

    // We tell React Loadable to load all required assets and start listening - ROCK AND ROLL!
    Loadable.preloadAll().then(() => {
        const port = app.get('port');
        app.listen(port, console.log(`App listening on port ${port}!`));
    });
});