import type {Role} from "@/models/app/permission.ts";

interface User {
    id: number;
    email: string;
    name: string;
    roles: Role[];
}

interface UserState {
    token: string | null
    user: User | null
}

export type {User, UserState}