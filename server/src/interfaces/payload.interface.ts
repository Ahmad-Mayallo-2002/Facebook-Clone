import { User } from "../entities/user.entity";
import { Roles } from "../enums/roles.enum";

export interface Payload {
  id: string;
  role: Roles;
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}