import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import adminSwaggerDocs from './adminSwagger';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Swiggy Clone API',
    version: '1.0.0',
    description: 'API documentation for Swiggy Clone',
  },
  servers: [
    {
      url: 'http://localhost:5000/api/admin', // Change this URL to your production server
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'], // Path to your TypeScript route files
};

const swaggerSpec = swaggerJsdoc(options);
const combinedSpec = { ...swaggerSpec, paths: {  ...adminSwaggerDocs.paths } };
const setupSwaggerDocs = (app: Express): void => {
  
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(combinedSpec));
  
  console.log(`Swagger Docs available at http://localhost:5000/api-docs`);
};

export default setupSwaggerDocs;
