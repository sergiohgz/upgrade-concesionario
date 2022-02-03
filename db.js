// Connexion con MongoDB
const config = require('./config');
const mongoose = require('mongoose')

const DB_URL = config.DB_URL;

const connectDB = () => mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = { connectDB, DB_URL };
