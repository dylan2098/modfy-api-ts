export default {
  type: 'object',
  properties: {
    userId: {
      type: 'string',
    },
    roleId: {
      type: 'string',
    }
  },
  required: ['userId', 'roleId'],
  additionalProperties: false,
};
