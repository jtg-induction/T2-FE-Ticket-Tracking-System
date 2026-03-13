import { API_CONSTANTS, PAGE_SIZE } from '@constant';
import { baseApi } from '@service';
import { PaginatedResponse, Project } from '@type';

export const projectApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProjectById: builder.query<Project, string>({
            query: (id) => `${API_CONSTANTS.ENDPOINTS.PROJECT}${id}/`,
            providesTags: (_result, _error, id) => [
                { type: 'Project' as const, id },
            ],
        }),
        updateProject: builder.mutation<Project, { id: string; body: Project }>(
            {
                query: ({ id, body }) => ({
                    url: `${API_CONSTANTS.ENDPOINTS.PROJECT}${id}/`,
                    method: 'PATCH',
                    body,
                }),
                invalidatesTags: (_result, _error, { id }) => [
                    { type: 'Project' as const, id },
                    { type: 'Project' as const, id: 'LIST' },
                ],
            },
        ),
        createProject: builder.mutation<Project, Project>({
            query: (body) => ({
                url: API_CONSTANTS.ENDPOINTS.PROJECT,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Project' as const }],
        }),

        getProjects: builder.query<
            PaginatedResponse<Project>,
            { page: number; archived: boolean }
        >({
            query: ({ page, archived }) => ({
                url: API_CONSTANTS.ENDPOINTS.PROJECT,
                params: { page, archived, page_size: PAGE_SIZE },
            }),
            providesTags: (result) =>
                result?.data
                    ? [
                          ...result.data.map(({ id }) => ({
                              type: 'Project' as const,
                              id,
                          })),
                          { type: 'Project', id: 'LIST' },
                      ]
                    : [{ type: 'Project', id: 'LIST' }],
        }),
    }),
});

export const {
    useCreateProjectMutation,
    useGetProjectByIdQuery,
    useGetProjectsQuery,
    useUpdateProjectMutation,
} = projectApi;
