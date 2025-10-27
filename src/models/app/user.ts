import type {Role} from "@/models/app/permission.ts";


interface User {
    id: number;
    token: string;
    email: string;
    name: string;
    roles: Role[];
}


interface LoginRequest {
    email: string
    password: string
}

interface TokenLoginRequest {
    token: string
}

interface RegisterRequest {
    email: string
    password: string
    confirmation: string
}

export type {
    User,
    LoginRequest,
    TokenLoginRequest,
    RegisterRequest
}

