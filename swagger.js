const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Writing Hat API',
      version: '1.0.0',
      description: 'This API contains all the endpoints of wriring Hat CRUD.',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
