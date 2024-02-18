export default {
    type: 'object',
    properties: {
      role_id: {
        type: 'string',
      },
      menu_id: {
        type: 'string',
      }
    },
    required: ['role_id', 'menu_id'],
    additionalProperties: false,
  };
  