const REFRESH_KEY = 'refresh_token';
const USER_KEY = 'user';

export const tokenStorage = {
    getRefreshToken(): string | null {
        try {
            return localStorage.getItem(REFRESH_KEY);
        } catch {
            return null;
        }
    },
    setRefreshToken(token: string) {
        try {
            localStorage.setItem(REFRESH_KEY, token);
        } catch {}
    },
    removeRefreshToken() {
        try {
            localStorage.removeItem(REFRESH_KEY);
        } catch {}
    },
    setUser(userJson: string) {
        try {
            localStorage.setItem(USER_KEY, userJson);
        } catch {}
    },
    getUser(): string | null {
        try {
            return localStorage.getItem(USER_KEY);
        } catch {
            return null;
        }
    },
    removeUser() {
        try {
            localStorage.removeItem(USER_KEY);
        } catch {}
    },
};
