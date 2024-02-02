export default {
  type: 'object',
  properties: {
    menu_name: {
      type: 'string',
    },
    menu_path: {
      type: 'string',
    }
  },
  required: ['menu_name', 'menu_path'],
  additionalProperties: false,
};
