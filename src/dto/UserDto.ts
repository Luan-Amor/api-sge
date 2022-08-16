export interface createUserRequest {
    name: string;
    email: string;
    cpfCnpj: string;
    password: string;
    gender?: string;
    state?: string;
    city?: string;
}

export interface UserDto {
    id: string
    name?: string;
    email?: string;
    cpfCnpj?: string;
    gender?: string;
    state?: string;
    city?: string;
}

export interface UpdateUserRequest {
    name?: string;
    password?: string;
    state?: string;
    city?: string;
}