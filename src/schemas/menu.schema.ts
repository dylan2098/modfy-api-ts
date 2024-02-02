export default {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    path: {
      type: 'string',
    },
    status: {
      type: 'number',
    },
  },
  required: ['name', 'path'],
  additionalProperties: false,
};
