const rolesMap = new Map();
rolesMap.set('roleId', {
  param: 'role_uuid',
  type: 'string',
});

rolesMap.set('name', {
  param: 'role_name',
  type: 'string',
});

rolesMap.set('description', {
  param: 'role_description',
  type: 'string',
});

rolesMap.set('status', {
  param: 'role_status',
  type: 'number',
});

export const ROLE_CORE = rolesMap;


export enum ROLE_STATUS {
  ACTIVE = 1,
  BLOCK = 0,
}

export enum MENU_STATUS {
  ACTIVE = 1,
  BLOCK = 0,
}

export enum GENDER {
  FEMAILE = 0,
  MALE = 1,
}

export enum USER_STATUS {
  ACTIVE = 1,
  DEACTIVE = 0,
}


// handle user
const usersMap = new Map();
usersMap.set('userNo', {
  param: 'user_uuid',
  type: 'string',
});

usersMap.set('email', {
  param: 'user_email',
  type: 'string',
});

usersMap.set('password', {
  param: 'user_password',
  type: 'string',
});

usersMap.set('firstName', {
  param: 'user_first_name',
  type: 'string',
});

usersMap.set('lastName', {
  param: 'user_last_name',
  type: 'string',
});

usersMap.set('phone', {
  param: 'user_phone',
  type: 'string',
});

usersMap.set('gender', {
  param: 'user_gender',
  type: 'string',
})

usersMap.set('birthday', {
  param: 'user_birthday',
  type: 'string',
});

usersMap.set('status', {
  param: 'user_status',
  type: 'number',
});

usersMap.set('avatar', {
  param: 'user_avatar',
  type: 'string',
});

usersMap.set('createdAt', {
  param: 'user_created_at',
  type: 'string',
});

usersMap.set('updatedAt', {
  param: 'user_updated_at',
  type: 'string',
});


export const USER_CORE = usersMap;