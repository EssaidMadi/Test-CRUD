'use strict';

const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
    mongoose.connect('mongodb://localhost/BonsArtisansDB', {
        
    }).then(() => winston.info('Mongo Db Connected.....'));
}