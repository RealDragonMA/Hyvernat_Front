export interface User {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    gender: 'Femme' | 'Homme' | 'Autre';
    classe: string;
    campus: string;
    validationLink: number;
    status: 'admin' | 'relay' | 'student' | 'staff';
    dateBan?: string;
    image?: string;
    hours?: Hour[];
    token?: string;
}

export interface Hour {
    date: number;
    amount: number;
}

export interface SlotActionPayload {
    idStudent: string;
    idSlot?: string;
    sport?: string;
}

export interface GetAllUsersParams {
    name?: string;
    validationLink?: number;
    status?: 'admin' | 'relay' | 'student' | 'staff';
    start?: number;
    end?: number;
}

export interface RegisterPayload {
    firstname: string;
    lastname: string;
    email: string;
    gender: string;
    classe: string;
    campus: string;
    status?: string;
}

export interface UpdateUserPayload {
    firstname?: string;
    lastname?: string;
    email: string;
    password?: string;
    validationLink?: number;
    gender?: string;
    classe?: string;
    image?: string;
    campus?: string;
}

export interface BanUserPayload {
    email: string;
    validationLink?: number;
    dateBan?: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface ForgotPasswordPayload {
    email: string;
}

export interface GetUserParams {
    email?: string;
    id?: string;
    start?: number;
    end?: number;
    ids?: string[];
}
