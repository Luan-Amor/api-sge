export interface createUserRequest {
    name: string;
    email: string;
    password: string;
    gender?: string;
    state?: string;
    city?: string;
}

export interface UserDto {
    name?: string;
    email?: string;
    gender?: string;
    state?: string;
    city?: string;
}

export interface UpdateUserRequest {
    name?: string;
    password?: string;
    gender?: string;
    state?: string;
    city?: string;
}