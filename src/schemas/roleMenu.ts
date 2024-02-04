export default {
    type: 'object',
    properties: {
      role_uuid: {
        type: 'string',
      },
      menu_uuid: {
        type: 'string',
      }
    },
    required: ['role_uuid', 'menu_uuid'],
    additionalProperties: false,
  };
  