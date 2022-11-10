'use strict';
const winston  = require('winston');
require('express-async-errors');

module.exports = () => {
    process.on('uncaughtException', (e) => {
        winston.error(e.message, e);
        process.exit(1);
    });
    process.on('unhandledRejection', (e) => {
        winston.error(e.message, e);
        process.exit(1);
    });

    winston.add(winston.transports.File, {filename: 'logfile.log'});
}