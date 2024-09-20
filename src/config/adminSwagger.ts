
const adminSwaggerDocs = {

  paths: {
    '/signup': {
        post: {
          tags: ['Admin'],
          summary: 'Admin signup',
          requestBody: {
            description: 'Admin signup details',
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Admin signed up successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string' },
                    },
                  },
                },
              },
            },
            400: {
              description: 'Admin already exists',
            },
            500: {
              description: 'Server error',
            },
          },
        },
      },
   '/login': {
  post: {
    tags: ['Admin'],
    summary: 'Admin login',
    requestBody: {
      description: 'Admin login details',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: { type: 'string' },
              password: { type: 'string' },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Admin logged in successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                adminId: { type: 'string' },
              },
            },
          },
        },
      },
      400: {
        description: 'Invalid credentials',
      },
      500: {
        description: 'Server error',
      },
    },
  },
},

    // Add the rest of your admin routes here...
    '/admin/{adminId}/restaurants': {
      get: {tags: ['Admin'],
        summary: 'Get all restaurants for admin',
        parameters: [
          {
            in: 'path',
            name: 'adminId',
            required: true,
            schema: { type: 'string' },
            description: 'Admin ID',
          },
        ],
        responses: {
          200: { description: 'A list of restaurants' },
        },
      },
      post: {tags: ['Admin'],
        summary: 'Create a restaurant for admin',
        parameters: [
          {
            in: 'path',
            name: 'adminId',
            required: true,
            schema: { type: 'string' },
            description: 'Admin ID',
          },
        ],
        requestBody: {
          description: 'Restaurant details',
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  description: { type: 'string' },
                  image: { type: 'string' },
                },
              },
            },
          },
          responses: {
            201: { description: 'Restaurant created successfully' ,
                
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        restaurantId: { type: 'string' },
                        
                      },
                    },
                  },
                },

             },
          },
        },
      },
    },
   
  },
};

export default adminSwaggerDocs;
