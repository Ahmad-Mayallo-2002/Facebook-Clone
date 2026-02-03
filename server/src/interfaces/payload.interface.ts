import { Roles } from "../enums/roles.enum";

export interface Payload {
    id: string;
    role: Roles;
    token: string;
}