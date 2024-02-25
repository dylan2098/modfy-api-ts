export default {
    type: 'object',
    properties: {
      catalog_id: {
        type: 'string',
      },
      category_name: {
        type: 'string',
      }
    },
    required: ['catalog_id', 'category_name'],
    additionalProperties: false,
  };
  