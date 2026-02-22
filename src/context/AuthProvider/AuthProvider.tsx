import { createContext, useContext, useEffect, useState } from 'react';

import { LoadingPage } from '@page';
import { refreshAccessTokenApi } from '@service';
import { LoginResponse } from '@type';

import { AuthContextType } from './authProvider.type';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const login = (data: LoginResponse) => {
        setAccessToken(data.access);
    };

    const logout = () => {
        setAccessToken(null);
    };

    useEffect(() => {
        const initAuth = async () => {
            try {
                const data = await refreshAccessTokenApi();
                setAccessToken(data.access);
            } catch (error) {
                console.error('Session expired', error);
                logout();
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ accessToken, isLoading, login, logout }}>
            {!isLoading ? children : <LoadingPage />}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }
    return context;
};
