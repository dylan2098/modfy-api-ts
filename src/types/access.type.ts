export type User = {
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
    access_token?: string;
    refresh_token?: string;
}

export type Role = {
  role_uuid?: string;
  role_name?: string;
  role_description?: string;
  role_status?: number;
}

export type Menu = {
  menu_uuid?: string;
  menu_name?: string;
  menu_path?: string;
  menu_status?: number;
}

export type UserRole = {
  user_uuid?: string;
  role_uuid?: string;
  user_role_status?: number;
}

export type RoleMenu = {
  role_uuid?: string;
  menu_uuid?: string;
  menu_role_status?: number;
}

export type KeyToken = {
  user_uuid?: string;
  refresh_token?: string;
  private_key?: string;
  public_key?: string;
  key_token_updated_at?: string;
}