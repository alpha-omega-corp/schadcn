import type {Role} from "@/models/app/permission.ts";

interface User {
    id: number;
    token: string;
    email: string;
    name: string;
    roles: Role[];
}

export type {User}