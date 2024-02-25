export default {
    type: 'object',
    properties: {
      inventory_stock: {
        type: 'string',
      },
      inventory_mode: {
        type: 'integer',
      },
      inventory_expected_date: {
        type: 'string',
      },
    },
    required: ['inventory_stock', 'inventory_mode', 'inventory_expected_date'],
    additionalProperties: false,
  };
  