export const createUserSchema ={
  type: 'object',
  properties: {
    user_email: {
      type: 'string',
    },
    user_password: {
      type: 'string',
    },
    user_first_name: {
      type: 'string',
    },
    user_last_name: {
      type: 'string',
    },
    user_phone: {
      type: 'string',
    },
    user_gender: {
      type: 'integer',
    },
    user_birthday: {
      type: 'string',
    },
    user_avatar: {
      type: 'string',
    },
  },
  required: ['user_email', 'user_password', 'user_first_name', 'user_last_name', 'user_phone'],
  additionalProperties: false,
};


export const updateUserSchema ={
  type: 'object',
  properties: {
    user_first_name: {
      type: 'string',
    },
    user_last_name: {
      type: 'string',
    },
    user_phone: {
      type: 'string',
    },
    user_gender: {
      type: 'integer',
    },
    user_birthday: {
      type: 'string',
    },
    user_avatar: {
      type: 'string',
    },
  },
  additionalProperties: false,
};
