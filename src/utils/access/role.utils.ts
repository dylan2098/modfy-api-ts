import { RoleType } from '../../types/role.type';

export function convertDataRole(obj: RoleType, type = 'create') {
  if (!obj) return {};

  const data = {};

  if(obj.roleId) {
    data['role_uuid'] = obj.roleId;
  }

  if (obj.name) {
    data['role_name'] = obj.name;
  }

  if (obj.description) {
    data['role_description'] = obj.description;
  }

  if(obj.status !== -1) {
    data['role_status'] = obj.status;
  }

  if(type === 'update') {
    delete data['role_uuid'];
  }

  return data;
}