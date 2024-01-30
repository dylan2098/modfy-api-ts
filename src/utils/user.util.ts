import { UserType } from '../types/user.type';

export function convertDataUser(obj: UserType) {
  if (!obj) return {};

  const data = {};

  if (obj.email) {
    data['user_email'] = obj.email;
  }

  if (obj.password) {
    data['user_password'] = obj.password;
  }

  if (obj.firstName) {
    data['user_first_name'] = obj.firstName;
  }

  if (obj.lastName) {
    data['user_last_name'] = obj.lastName;
  }

  if (obj.phone) {
    data['user_phone'] = obj.phone;
  }

  if (obj.gender) {
    data['user_gender'] = obj.gender;
  }

  if (obj.birthday) {
    data['user_birthday'] = obj.birthday;
  }

  if(obj.status) {
    data['user_status'] = obj.status; 
  }

  if (obj.avatar) {
    data['user_avatar'] = obj.avatar;
  }

  if (obj.createdAt) {
    data['user_created_at'] = obj.createdAt;
  }

  if (obj.updatedAt) {
    data['user_updated_at'] = obj.updatedAt;
  }

  return data;
}