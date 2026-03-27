import { API_CONSTANTS, PROJECT_PAGE_SIZE } from '@constant';
import { baseApi } from '@service';
import { EntityResponse, PaginatedResponse, Project } from '@type';

export const projectApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProjectById: builder.query<EntityResponse<Project>, string>({
            query: (id) => `${API_CONSTANTS.ENDPOINTS.PROJECT}${id}/`,
            providesTags: (_result, _error, id) => [
                { type: 'Project' as const, id },
            ],
        }),
        updateProject: builder.mutation<
            EntityResponse<Project>,
            { id: string; body: Partial<Project> }
        >({
            query: ({ id, body }) => ({
                url: `${API_CONSTANTS.ENDPOINTS.PROJECT}${id}/`,
                method: API_CONSTANTS.METHODS.PATCH,
                body,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'Project' as const, id },
                { type: 'Project' as const, id: 'LIST' },
            ],
        }),
        createProject: builder.mutation<EntityResponse<Project>, Project>({
            query: (body) => ({
                url: API_CONSTANTS.ENDPOINTS.PROJECT,
                method: API_CONSTANTS.METHODS.POST,
                body,
            }),
            invalidatesTags: [{ type: 'Project' as const }],
        }),

        getProjects: builder.query<
            PaginatedResponse<Project>,
            {
                page: number;
                archived?: boolean;
                search?: string;
                site_url?: string;
                pageSize?: number;
            }
        >({
            query: ({ page, archived, search, site_url, pageSize }) => ({
                url: API_CONSTANTS.ENDPOINTS.PROJECT,
                params: {
                    page,
                    page_size: pageSize ?? PROJECT_PAGE_SIZE,
                    ...(archived !== undefined && { is_archived: archived }),
                    ...(search && { search }),
                    ...(site_url && { site_url }),
                },
            }),
            providesTags: (result) => {
                if (result?.data && Array.isArray(result.data)) {
                    return [
                        ...result.data.map(({ id }) => ({
                            type: 'Project' as const,
                            id,
                        })),
                        { type: 'Project' as const, id: 'LIST' },
                    ];
                }
                return [{ type: 'Project' as const, id: 'LIST' }];
            },
        }),
    }),
});

export const {
    useCreateProjectMutation,
    useGetProjectByIdQuery,
    useGetProjectsQuery,
    useUpdateProjectMutation,
} = projectApi;
