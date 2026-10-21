import { UserRole } from "./user.model";

export interface LoginResponse {
  id: number;
  name: string;
  username: string;
  userRole: UserRole;
  token: string;
  tokenType: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

