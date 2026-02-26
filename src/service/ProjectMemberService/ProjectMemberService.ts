import { API_CONSTANTS } from '@constant';
import { baseApi } from '@service';
import { EntityResponse, PaginatedResponse, ProjectMember } from '@type';

export const projectUserApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProjectMembers: builder.query<
            PaginatedResponse<ProjectMember>,
            { id: string; page: number }
        >({
            query: ({ id, page }) => ({
                url: `${API_CONSTANTS.ENDPOINTS.PROJECT}${id}/members/`,
                params: { page, page_size: 5 },
            }),
            providesTags: (result, _error, { id }) =>
                result && 'data' in result && Array.isArray(result.data)
                    ? [
                          ...result.data.map((m) => ({
                              type: 'ProjectMember' as const,
                              id: m.user_id,
                          })),
                          { type: 'ProjectMember', id: `LIST-${id}` },
                      ]
                    : [{ type: 'ProjectMember', id: `LIST-${id}` }],
        }),

        inviteMember: builder.mutation<
            EntityResponse<null>,
            { id: string; email: string }
        >({
            query: ({ id, email }) => ({
                url: `${API_CONSTANTS.ENDPOINTS.PROJECT}${id}/invite/`,
                method: 'POST',
                body: { email },
            }),
            invalidatesTags: (_res, _err, { id }) => [
                { type: 'ProjectMember', id: `LIST-${id}` },
            ],
        }),

        acceptInvite: builder.mutation<EntityResponse<null>, string>({
            query: (token) => ({
                url: `${API_CONSTANTS.ENDPOINTS.PROJECT}accept-invite/${token}/`,
                method: 'POST',
            }),
            invalidatesTags: () => [{ type: 'ProjectMember' }],
        }),

        rejectInvite: builder.mutation<EntityResponse<null>, string>({
            query: (token) => ({
                url: `${API_CONSTANTS.ENDPOINTS.PROJECT}reject-invite/${token}/`,
                method: 'POST',
            }),
            invalidatesTags: () => [{ type: 'ProjectMember' }],
        }),

        updateMemberRole: builder.mutation<
            EntityResponse<ProjectMember>,
            { projectId: string; userId: string; projectRole: string }
        >({
            query: ({ projectId, userId, projectRole }) => ({
                url: `${API_CONSTANTS.ENDPOINTS.PROJECT}${projectId}/members/${userId}/role/`,
                method: 'PATCH',
                body: { projectRole },
            }),
            invalidatesTags: (_res, _err, { projectId }) => [
                { type: 'ProjectMember', id: `LIST-${projectId}` },
            ],
        }),

        removeMember: builder.mutation<
            EntityResponse<null>,
            { projectId: string; userId: string }
        >({
            query: ({ projectId, userId }) => ({
                url: `${API_CONSTANTS.ENDPOINTS.PROJECT}${projectId}/members/${userId}/`,
                method: 'DELETE',
            }),
            invalidatesTags: (_res, _err, { projectId }) => [
                { type: 'ProjectMember', id: `LIST-${projectId}` },
            ],
        }),
    }),
});

export const {
    useGetProjectMembersQuery,
    useInviteMemberMutation,
    useUpdateMemberRoleMutation,
    useRemoveMemberMutation,
    useAcceptInviteMutation,
    useRejectInviteMutation,
} = projectUserApi;
