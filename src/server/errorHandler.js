const logger = require('./winston-configurer.js');

module.exports = (err, req, res) => {
    // set locals, only providing error in staging
    const isDev = req.app.get('env') === 'staging';

    logger.error(`ERROR ${err.message}, URL: ${req.originalUrl} from ${req.ip}`);

    // render the error page
    res.status(err.status || 500);

    if (isDev) {
        res.send(`Error: ${JSON.stringify(err, null, "   ")}`);
    } else {
        res.send('error');
    }
};
