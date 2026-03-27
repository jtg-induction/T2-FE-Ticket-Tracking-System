import { baseApi } from '@service';
import authReducer from './auth/auth.slice';

/**
 * The global Redux state tree.
 */
export type RootState = {
    /** User session and authentication state. */
    auth: ReturnType<typeof authReducer>;

    /** Cached API data and request statuses from RTK Query. */
    [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;
};
