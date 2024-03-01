export default {
    type: 'object',
    properties: {
      catalog_id: {
        type: 'string',
      },
      catalog_name: {
        type: 'string',
      }
    },
    required: ['catalog_name'],
    additionalProperties: false,
  };
  