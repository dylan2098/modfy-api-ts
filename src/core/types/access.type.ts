export type User = {
    user_id?: string;
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
    access_id?: string; // token index
    role_name?: string;
}

export type Role = {
  role_id?: string;
  role_name?: string;
  role_description?: string;
  role_status?: number;
}

export type Menu = {
  menu_id?: string;
  menu_name?: string;
  menu_path?: string;
  menu_status?: number;
}

export type UserRole = {
  user_id?: string;
  role_id?: string;
  user_role_status?: number;
}

export type RoleMenu = {
  role_id?: string;
  menu_id?: string;
  menu_role_status?: number;
}

export type KeyToken = {
  key_token_id?: number;
  user_id?: string;
  refresh_token?: string;
  private_key?: string;
  public_key?: string;
  ip_address?: string;
  updated_at?: string;
}

export type Address = {
  address_id?: string;
  customer_first_name?: string;
  customer_last_name?: string;
  address_phone?: string;
  address_street?: string;
  address_zipcode?: string;
  address_city?: string;
  address_country?: string;
  address_state?: string;
  address_note?: string;
  address_status?: number;
}

export type AddressBooks = {
  address_book_id?: string;
  user_id?: string;
  address_id?: string;
  address_selected?: boolean;
}