import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router';

import { projectApi } from '@service';
import { EntityResponse, ErrorResponse, Project, ProjectRequest } from '@type';

export const useProjectForm = () => {
    const {
        useGetProjectByIdQuery,
        useUpdateProjectMutation,
        useCreateProjectMutation,
    } = projectApi;
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isNew = id === 'new';

    const [isEditing, setIsEditing] = useState(isNew);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const {
        data: response,
        isLoading: isFetching,
        isSuccess,
    } = useGetProjectByIdQuery(id!, { skip: isNew });

    const project = (response as EntityResponse<Project>)?.data;

    const [updateProject, { isLoading: isUpdating }] =
        useUpdateProjectMutation();
    const [createProject, { isLoading: isCreating }] =
        useCreateProjectMutation();

    const [tempProject, setTempProject] = useState<ProjectRequest>({
        title: '',
        description: '',
        jira_project_key: '',
        site_url: '',
        is_archived: false,
    });

    useEffect(() => {
        if (isSuccess && project && !isNew) {
            setTempProject({
                title: project.title || '',
                description: project.description || '',
                jira_project_key: project.jira_project_key || '',
                site_url: project.site_url || '',
                is_archived: project.is_archived || false,
            });
        }
    }, [project, isSuccess, isNew]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setTempProject((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleToggleEdit = (val: boolean) => {
        if (!val && project) {
            setTempProject({
                title: project.title,
                description: project.description,
                jira_project_key: project.jira_project_key,
                site_url: project.site_url,
                is_archived: project.is_archived,
            });
        }
        setIsEditing(val);
    };

    const handleSave = async () => {
        try {
            if (isNew) {
                const res = await createProject(tempProject).unwrap();
                const successRes = res as EntityResponse<Project>;
                const newId = successRes.data?.id;
                if (newId) {
                    void navigate(`/projects/${newId}`);
                }
            } else {
                await updateProject({
                    id: id!,
                    body: {
                        title: tempProject.title,
                        description: tempProject.description,
                        is_archived: tempProject.is_archived,
                    },
                }).unwrap();
                setIsEditing(false);
            }
        } catch (err: unknown) {
            const errorContainer = err as { data: ErrorResponse };
            const errorData = errorContainer.data;

            if (errorData && 'errors' in errorData && errorData.errors) {
                const messages = Object.values(
                    errorData.errors,
                ).flat() as string[];
                setErrorMessages(messages);
            }
            setSnackbarOpen(true);
        }
    };

    const handleUnarchive = async () => {
        try {
            await updateProject({
                id: id!,
                body: {
                    is_archived: false,
                },
            }).unwrap();
            setIsEditing(false);
        } catch (err: unknown) {
            const errorContainer = err as { data: ErrorResponse };
            const errorData = errorContainer.data;

            if (errorData && 'errors' in errorData && errorData.errors) {
                const messages = Object.values(
                    errorData.errors,
                ).flat() as string[];
                setErrorMessages(messages);
            }
            setSnackbarOpen(true);
        }
    };

    return {
        project,
        tempProject,
        isEditing,
        isNew,
        handleToggleEdit,
        handleChange,
        handleSave,
        navigate,
        loading: isFetching || isUpdating || isCreating,
        snackbarOpen,
        setSnackbarOpen,
        errorMessages,
        handleUnarchive,
    };
};
