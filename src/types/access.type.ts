export type UserType = {
    user_uuid?: string;
    user_email?: string;
    user_password?: string;
    user_first_name?: string;
    user_last_name?: string;
    user_phone?: string;
    user_gender?: string;
    user_birthday?: string;
    user_avatar?: string;
    user_status?: number;
    user_created_at?: string;
    user_updated_at?: string;
}

export type RoleType = {
  role_uuid?: string;
  role_name?: string;
  role_description?: string;
  role_status?: number;
}

export type MenuType = {
  menu_uuid?: string;
  menu_name?: string;
  menu_path?: string;
  menu_status?: number;
}

export type UserRoleType = {
  user_uuid?: string;
  role_uuid?: string;
  user_role_status?: number;
}