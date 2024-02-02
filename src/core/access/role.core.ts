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