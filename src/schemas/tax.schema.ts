export default {
  type: 'object',
  properties: {
    tax_name: {
      type: 'string',
    },
    tax_value: {
      type: 'float',
    },
  },
  required: ['tax_name', 'tax_name'],
  additionalProperties: false,
};
