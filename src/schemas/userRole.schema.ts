export default {
  type: 'object',
  properties: {
    user_uuid: {
      type: 'string',
    },
    role_uuid: {
      type: 'string',
    }
  },
  required: ['user_uuid', 'role_uuid'],
  additionalProperties: false,
};
