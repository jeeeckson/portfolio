
const logger = require('./winston-configurer');
/**
 * Event listener for HTTP server "error" event.
 */

let onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = 'Port ' + '3000';

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

module.exports = onError;