export default {
  type: 'object',
  properties: {
    tax_id: {
      type: 'string',
    },
    tax_name: {
      type: 'string',
    },
    tax_value: {
      type: 'number',
    },
  },
  required: ['tax_name', 'tax_value'],
  additionalProperties: false,
};
