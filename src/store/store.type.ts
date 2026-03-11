import { baseApi } from '@service';

import authReducer from './auth/auth.slice';

export type RootState = {
    auth: ReturnType<typeof authReducer>;
    [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;
};
