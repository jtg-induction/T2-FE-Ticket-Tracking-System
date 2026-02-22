import { LoginResponse } from '@type';

export type AuthContextType = {
    accessToken: string | null;
    isLoading: boolean;
    login: (data: LoginResponse) => void;
    logout: () => void;
};
