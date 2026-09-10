import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API v2',
      version: '2.0.0',
      description:
        'A comprehensive blog management API with user authentication, content management, and administration capabilities',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://api.yourdomain.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User registration, login, logout',
      },
      {
        name: 'Users',
        description: 'User management operations',
      },
      {
        name: 'Blogs',
        description: 'Blog CRUD operations',
      },
      {
        name: 'Comments',
        description: 'Comment management operations',
      },
      {
        name: 'Author Requests',
        description: 'Request to become author',
      },
    ],
  },

  apis: ['./src/routes/*.swagger.ts', './src/controllers/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerUiOptions = {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Blog API Documentation',
};

const swaggerUiOptionsDist = {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  defaultModelsExpandDepth: 2,
  defaultModelExpandDepth: 3,
  docExpansion: 'list',
  maxDisplayedTags: '',
};

export const loadSwaggerSpec = () => swaggerSpec;

export const swaggerUiOptionsSpec = swaggerUiOptionsDist;

export default swaggerUi;
