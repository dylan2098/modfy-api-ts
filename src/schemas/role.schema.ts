export default {
    type: 'object',
    properties: {
      role_name: {
        type: 'string',
      },
      role_description: {
        type: 'string'
      }
    },
    required: ['role_name', 'role_description'],
    additionalProperties: false,
  };
  