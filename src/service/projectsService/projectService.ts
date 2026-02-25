import { ApiResponse } from 'type/standard.type';

import { API_CONSTANTS } from '@constant';
import { baseApi } from '@store';
import { Project, ProjectRequest } from '@type';

export const projectApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProjectById: builder.query<ApiResponse<Project>, string>({
            query: (id) => `${API_CONSTANTS.ENDPOINTS.PROJECT}${id}/`,
            providesTags: (_result, _error, id) => [
                { type: 'Project' as const, id },
            ],
        }),
        updateProject: builder.mutation<
            ApiResponse<Project>,
            { id: string; body: Partial<ProjectRequest> }
        >({
            query: ({ id, body }) => ({
                url: `${API_CONSTANTS.ENDPOINTS.PROJECT}${id}/`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'Project' as const, id },
            ],
        }),
        createProject: builder.mutation<ApiResponse<Project>, ProjectRequest>({
            query: (body) => ({
                url: API_CONSTANTS.ENDPOINTS.PROJECT,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Project' as const }],
        }),

        getProjects: builder.query<
            ApiResponse<Project>,
            { page: number; archived: boolean }
        >({
            query: ({ page, archived }) => ({
                url: API_CONSTANTS.ENDPOINTS.PROJECT,
                params: {
                    page,
                    archived,
                    page_size: 5,
                },
            }),
            providesTags: (result) => {
                if (
                    result &&
                    'success' in result &&
                    'data' in result &&
                    Array.isArray(result.data)
                ) {
                    return [
                        ...result.data.map((p) => ({
                            type: 'Project' as const,
                            id: p.id,
                        })),
                        { type: 'Project', id: 'LIST' },
                    ];
                }
                return [{ type: 'Project', id: 'LIST' }];
            },
        }),
    }),
});
