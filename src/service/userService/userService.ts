import { API_CONSTANTS } from '@constant';
import { baseApi } from '@service';
import { EditProfileRequest, UserResponse } from '@type';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserById: builder.query<UserResponse, string>({
            query: (id) =>
                id
                    ? `${API_CONSTANTS.ENDPOINTS.USER}${id}/`
                    : `${API_CONSTANTS.ENDPOINTS.USER}`,

            providesTags: (_result, _error, id) => [
                { type: 'User' as const, id: id || 'ME' },
            ],
        }),

        updateUser: builder.mutation<
            UserResponse,
            { body: EditProfileRequest }
        >({
            query: ({ body }) => ({
                url: `${API_CONSTANTS.ENDPOINTS.USER}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: () => [{ type: 'User' as const }],
        }),
    }),
});

export const { useGetUserByIdQuery, useUpdateUserMutation } = userApi;
