// app initialization (db, routers, etc.)
const express = require('express');
const app = express();
require('./database/initDB')();// initialize database connection

// swagger documentation
const swaggerSpec = require('./documentation/swaggerSpec');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const routes = require('./controllers')
app.use('/', routes);

let port = process.env.APP_PORT || 8383;

if(process.env.NODE_ENV === 'test') {
    port = 3131;
}

app.listen(port, (err) => {
    if(err) console.log(err);
    console.log(`listening on port ${port}`);
});


module.exports = app;