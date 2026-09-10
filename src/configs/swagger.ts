import swaggerJSDoc from 'swagger-jsdoc';
import path from 'node:path';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.3',

    info: {
      title: 'Blog API',
      version: '2.0.0',
      description: 'API documentation for the Blog API',
    },

    servers: [
      {
        url: '/api/v1',
        description: 'Current API server',
      },
    ],

    tags: [
      { name: 'Authentication', description: 'Registration and sessions' },
      { name: 'Users', description: 'User account management' },
      { name: 'Blogs', description: 'Blog management' },
      { name: 'Comments', description: 'Comment management' },
      { name: 'Author Requests', description: 'Author access requests' },
    ],

    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'session_id',
          description: 'HTTP-only cookie set by POST /auth/login',
        },
      },
    },
  },

  apis: [path.join(__dirname, '../routes/swagger/*.swagger.ts')],
};

export const swaggerSpec = swaggerJSDoc(options);
