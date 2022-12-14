// app initialization (db, routers, etc.) - hi bye
const express = require('express');
const app = express();
require('./database/initDB')();// initialize database connection

let port = process.env.APP_PORT || 8383;
if(process.env.NODE_ENV === 'test') {
    port = 3131;
}

// swagger documentation
const swaggerSpec = require('./documentation/swaggerSpec');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const routes = require('./routes')
app.use('/', routes);


app.listen(port, (err) => {
    if(err) console.log(err);
    console.log(`listening on port ${port}`);
});

