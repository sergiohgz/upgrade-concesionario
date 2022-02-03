// const dotenv = require('dotenv');
// dotenv.config();
require('dotenv').config();

const config = {
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL || 'mongodb://localhost:27107/concesionario',
    JWT_SECRET: process.env.JWT_SECRET || 'secreto-para-desarrollo',
};
console.log('CONFIG', config);

module.exports = config;
