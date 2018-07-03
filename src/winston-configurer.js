"use strict";

const logger = require('winston');

const { format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

logger.configure({
    format: combine(
        label({label: 'LOG'}),
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console({colorize: true})
    ]
});

module.exports = logger;