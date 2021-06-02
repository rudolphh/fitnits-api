// app initialization (db, routers, etc.)
const express = require('express');
const app = express();

require('./database/initDB')();// initialize database connection

const routes = require('./controllers')
app.use('/', routes);

// when all middleware/routes exhausted - 404
app.use(function (req, res, next) {
    res.status(404).json({ success: false, message: '404 Not Found'})
})

const port = process.env.APP_PORT || 8383;
app.listen(port, (err) => {
    if(err) console.log(err);
    console.log(`listening on port ${port}`);
});



module.exports = app;