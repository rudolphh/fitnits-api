const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for Fitnits',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from fitapi.rudyah.com.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Rudy A. Hernandez',
      url: 'https://rudyah.com',
      email: 'rudolpharthur@gmail.com'
    },
  },
  servers: [
    {
      url: 'http://fitapi.rudyah.com',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;