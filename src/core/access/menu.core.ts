const menusMap = new Map();
menusMap.set('menuId', {
  param: 'menu_uuid',
  type: 'string',
});

menusMap.set('name', {
  param: 'menu_name',
  type: 'string',
});

menusMap.set('path', {
  param: 'menu_path',
  type: 'string',
});

menusMap.set('status', {
  param: 'menu_status',
  type: 'number',
});

export const MENU_CORE = menusMap;

export enum MENU_STATUS {
  ACTIVE = 1,
  BLOCK = 0,
}