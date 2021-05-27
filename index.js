// app initialization (db, routers, etc.)
const express = require('express');
const app = express();
const db = require('./database/db');

// const indexController = require('./controllers')
// app.use('/', indexController);

const port = process.env.APP_PORT || 8383;
app.listen(port, (err) => {
    if(err) console.log(err);
    console.log(`listening on port ${port}`);
});

module.exports = app;