import { API_CONSTANTS } from '@constant';
import { baseApi } from '@service';
import { EditProfileRequest, EntityResponse, UserResponse } from '@type';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserById: builder.query<EntityResponse<UserResponse>, string>({
            query: (id) =>
                id
                    ? `${API_CONSTANTS.ENDPOINTS.USER}${id}/`
                    : API_CONSTANTS.ENDPOINTS.USER,

            providesTags: (_result, _error, id) => [
                { type: 'User' as const, id: id || 'ME' },
            ],
        }),

        updateUser: builder.mutation<
            EntityResponse<UserResponse>,
            { body: EditProfileRequest }
        >({
            query: ({ body }) => ({
                url: API_CONSTANTS.ENDPOINTS.USER,
                method: API_CONSTANTS.METHODS.PATCH,
                body,
            }),
            invalidatesTags: () => [{ type: 'User' as const }],
        }),
    }),
});

export const { useGetUserByIdQuery, useUpdateUserMutation } = userApi;
