export default {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    gender: {
      type: 'integer',
    },
    birthday: {
      type: 'string',
    },
    avatar: {
      type: 'string',
    },
  },
  required: ['email', 'password', 'firstName', 'lastName', 'phone'],
  additionalProperties: false,
};
