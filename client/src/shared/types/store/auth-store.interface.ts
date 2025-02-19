import { User } from '@entities/user';
import { AuthResponseLogin } from '../api/auth-response.interface';
import { ApiResponse } from '../api/api-response.interface';

export interface AuthStore {
    isAuth: boolean;
    user: User | null;
    accessToken: string | null;
    login: (email: string) => Promise<ApiResponse<AuthResponseLogin> | null>;
    refresh: () => Promise<ApiResponse<string> | null>;
    logout: () => void;
    getById: (id: string) => Promise<ApiResponse<User> | null>;
    setAuth: (user: ApiResponse<AuthResponseLogin> | null) => void;
    setUser: (user: User) => void;
}
