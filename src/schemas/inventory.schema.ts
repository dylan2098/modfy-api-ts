export const schemaCreate = {
  type: 'object',
  properties: {
    inventory_name: {
      type: 'string',
    },
  },
  required: ['inventory_name'],
  additionalProperties: false,
};


export const schemaUpdate = {
  type: 'object',
  properties: {
    inventory_id: {
      type: 'string',
    },
    inventory_name: {
      type: 'string',
    },
  },
  required: ['inventory_id', 'inventory_name'],
  additionalProperties: false,
};
