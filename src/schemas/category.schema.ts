export const createSchema = {
  type: 'object',
  properties: {
    catalog_id: {
      type: 'string',
    },
    category_name: {
      type: 'string',
    },
  },
  required: ['catalog_id', 'category_name'],
  additionalProperties: false,
};

export const updateSchema = {
  type: 'object',
  properties: {
    category_id: {
      type: 'string'
    },
    catalog_id: {
      type: 'string',
    },
    category_name: {
      type: 'string',
    },
  },
  required: ['category_id'],
  additionalProperties: false,
};