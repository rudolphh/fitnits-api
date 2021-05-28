// db initialization
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

/// db and models setup
const dbHost = process.env.DB_HOST, dbName = process.env.DB_NAME,
    dbUser = process.env.DB_USER, dbPass = process.env.DB_PASS;

const db = mongoose.connect(dbHost + '/' + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: dbUser,
    pass: dbPass
}).then(() => {
    console.log('connection established');
}).catch(error => console.error(error.message));



module.exports = db;

//db.createUser({ user: 'ru', pwd: 'NJT61wJvjrGtTT1H', roles: [{ role: 'readWrite', db: 'portfolio' }] });