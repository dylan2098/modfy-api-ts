export default {
  type: 'object',
  properties: {
    product_id: {
      type: 'string',
    },
    gross_price: {
      type: 'float',
    },
    net_price: {
      type: 'float',
    },
    tax_id: {
        type: 'string',
    }
  },
  required: ['product_id', 'gross_price', 'net_price', 'tax_id'],
  additionalProperties: false,
};
