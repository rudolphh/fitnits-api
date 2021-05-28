// app initialization (db, routers, etc.)
const express = require('express');
const app = express();
import * as db from './database/db';

// const indexController = require('./controllers')
// app.use('/', indexController);

const port = process.env.APP_PORT || 8383;
app.listen(port, (err : Error) => {
    if(err) console.log(err);
    console.log(`listening on port ${port}`);
});

module.exports = app;