export default {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      roleDescription: {
        type: 'string'
      }
    },
    required: ['name'],
    additionalProperties: false,
  };
  