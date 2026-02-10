import { User } from "../entities/user.entity";
import { Roles } from "../enums/roles.enum";

export interface Payload {
  id: string;
  role: Roles;
  token: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}