import { PropsWithChildren, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@hook';
import { LoadingPage } from '@page';
import { useRefreshMutation } from '@service';
import { logOut, setCredentials } from '@store';

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.auth);

    const [refresh] = useRefreshMutation();

    useEffect(() => {
        const initAuth = async () => {
            try {
                const response = await refresh().unwrap();
                dispatch(setCredentials(response.data.access));
            } catch {
                dispatch(logOut());
            }
        };
        void initAuth();
    }, [dispatch, refresh]);

    if (isLoading) return <LoadingPage />;
    return <>{children}</>;
};
