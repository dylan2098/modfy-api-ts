export type UserType = {
    userNo?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    gender?: string;
    birthday?: string;
    avatar?: string;
    status?: number;
    createdAt?: string;
    updatedAt?: string;
}

export type RoleType = {
  roleId?: string;
  name?: string;
  description?: string;
  status?: number;
}

export type MenuType = {
  menuId?: string;
  name?: string;
  path?: string;
  status?: number;
}

export type UserRoleType = {
  userRoleId?: string;
  userId?: string;
  roleId?: string;
  status?: number;
}