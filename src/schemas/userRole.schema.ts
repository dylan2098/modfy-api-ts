export default {
  type: 'object',
  properties: {
    user_id: {
      type: 'string',
    },
    role_id: {
      type: 'string',
    }
  },
  required: ['user_id', 'role_id'],
  additionalProperties: false,
};
