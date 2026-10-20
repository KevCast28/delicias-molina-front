export type UserRole = 'ADMIN' | 'SUPERADMIN'

export interface User {
  id: number;
  name: string;
  username: string;
  userRole: UserRole;
  isActive: boolean
}

export interface UserCreateRequest {
  name: string;
  username: string;
  password: string;
  userRole: UserRole;
}

export interface UserUpdateRequest {
  name: string;
  userRole: UserRole;
}
