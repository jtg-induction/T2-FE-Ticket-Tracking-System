import {
    createContext,
    FC,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

import PropTypes from 'prop-types';

import { LoadingPage } from '@page';
import { refreshAccessTokenApi } from '@service';
import { LoginResponse } from '@type';

import { AuthContextType } from './authProvider.type';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
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
            } catch {
                logout();
            } finally {
                setIsLoading(false);
            }
        };

        void initAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ accessToken, isLoading, login, logout }}>
            {!isLoading ? children : <LoadingPage />}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error('useAuth must be used inside AuthProvider');
    }
    return context;
};
