const userRoleMap = new Map();
userRoleMap.set('userId', {
  param: 'user_uuid',
  type: 'string',
});

userRoleMap.set('roleId', {
  param: 'role_uuid',
  type: 'string',
});

userRoleMap.set('status', {
  param: 'user_role_status',
  type: 'number',
});

export const USER_ROLE_CORE = userRoleMap;

export enum USER_ROLE_STATUS {
  ACTIVE = 1,
  BLOCK = 0,
}