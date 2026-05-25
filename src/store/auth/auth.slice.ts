import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    accessToken: string | null;
    isLoading: boolean;
}

const initialState: AuthState = {
    accessToken: null,
    isLoading: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            state.isLoading = false;
        },
        logOut: (state) => {
            state.accessToken = null;
            state.isLoading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setCredentials, logOut, setLoading } = authSlice.actions;
export default authSlice.reducer;
