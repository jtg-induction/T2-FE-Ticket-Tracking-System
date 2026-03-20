import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { PATHS } from '@constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema } from '@schema';
import {
    useCreateProjectMutation,
    useGetProjectByIdQuery,
    useUpdateProjectMutation,
} from '@service';
import { ErrorResponse, Project } from '@type';

export const useProjectForm = (projectId: string) => {
    const navigate = useNavigate();
    const isNew = projectId === 'new';

    const [isEditing, setIsEditing] = useState(isNew);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const { data: response, isLoading: isFetching } = useGetProjectByIdQuery(
        projectId,
        { skip: isNew },
    );

    const [updateProject, { isLoading: isUpdating }] =
        useUpdateProjectMutation();
    const [createProject, { isLoading: isCreating }] =
        useCreateProjectMutation();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, dirtyFields },
    } = useForm({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: '',
            description: '',
            jira_project_key: '',
            site_url: '',
            is_archived: false,
        },
    });

    const formValues = watch();

    useEffect(() => {
        if (response?.data && !isNew) {
            reset(response.data, { keepDefaultValues: false });
        }
    }, [response, isNew, reset]);

    const onSave = async (data: Project) => {
        try {
            if (isNew) {
                const res = await createProject(data).unwrap();
                if (res.data.id)
                    void navigate(`${PATHS.PROJECTS}/${res.data.id}`);
            } else {
                const keys = Object.keys(dirtyFields) as Array<keyof Project>;
                if (keys.length === 0) {
                    setIsEditing(false);
                    return;
                }

                const payload: Partial<Project> = {};
                keys.forEach((key) => {
                    Object.assign(payload, { [key]: data[key] });
                });

                await updateProject({
                    id: projectId,
                    body: payload,
                }).unwrap();
                setIsEditing(false);
            }
        } catch (err: unknown) {
            const errorData = (err as { data: ErrorResponse }).data;
            const messages = errorData?.errors
                ? Object.values(errorData.errors).flat()
                : [errorData?.message || 'An error occurred'];
            setErrorMessages(messages);
            setSnackbarOpen(true);
        }
    };

    return {
        project: response?.data,
        formValues,
        errors,
        register,
        isEditing,
        isNew,
        loading: isFetching || isUpdating || isCreating,
        snackbarOpen,
        setSnackbarOpen,
        errorMessages,
        handleToggleEdit: (val: boolean) => {
            if (!val) reset();
            setIsEditing(val);
        },
        handleSave: handleSubmit(onSave, (valErrors) => {
            const messages = Object.values(valErrors).map(
                (err) => err?.message || 'Invalid input',
            );
            setErrorMessages(messages);
            setSnackbarOpen(true);
        }),
        handleUnarchive: async () => {
            try {
                await updateProject({
                    id: projectId,
                    body: { is_archived: false },
                }).unwrap();
            } catch {
                setSnackbarOpen(true);
            }
        },
        navigate,
        setValue,
    };
};
