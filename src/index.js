import {join} from 'path';
import logger from './winston-configurer';
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import initRoutes from './server/init/routes';
const express = require('express');
const app = express();
const http = require('http').Server(app);

/**
 * Configures hot reloading and assets paths for local development environment.
 * Use the `npm start` command to start the local development server.
 *
 * @param app Express app
 */
const configureDevelopment = app => {
    const clientConfig = require('../webpack/client');
    const serverConfig = require('../webpack/server');
    const publicPath = clientConfig.output.publicPath;
    const outputPath = clientConfig.output.path;

    const multiCompiler = require('webpack')([clientConfig, serverConfig]);
    const clientCompiler = multiCompiler.compilers[0];

    app.use(require('webpack-dev-middleware')(multiCompiler, {publicPath}));
    app.use(require('webpack-hot-middleware')(clientCompiler));

    app.use(publicPath, express.static(outputPath));

    initRoutes(app);
    app.use(require('webpack-hot-server-middleware')(multiCompiler, {
        serverRendererOptions: {outputPath}
    }));

    app.set('views', join(__dirname, '../public/views'));
};

/**
 * Configures assets paths for production environment.
 * This environment is used in deployment and inside the docker container.
 * Use the `npm run build` command to create a production build.
 *
 * @param app Express app
 */
const configureProduction = app => {
    const clientStats = require('./assets/stats.json');
    const serverRender = require('./assets/app.server.js').default;
    const publicPath = '/';
    const outputPath = join(__dirname, 'assets');

    app.use(publicPath, express.static(outputPath));
    app.use(serverRender({
        clientStats,
        outputPath
    }));

    app.set('views', join(__dirname, 'views'));
};

//app.use(compression());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

//app.use(flash());
logger.info(`Configuring server for environment: ${process.env.NODE_ENV}...`);

if (process.env.NODE_ENV === 'development') {
    configureDevelopment(app);
} else {
    configureProduction(app);
}

logger.info('Configuring server engine...');
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);


http.listen(app.get('port'), () => logger.info(`Server listening on port ${app.get('port')}...`));

