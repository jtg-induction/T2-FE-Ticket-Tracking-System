import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

import { PATHS } from '@constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema } from '@schema';
import {
    useCreateProjectMutation,
    useGetProjectByIdQuery,
    useUpdateProjectMutation,
} from '@service';
import { ErrorResponse, Project } from '@type';

export const useProjectForm = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isNew = id === 'new';

    const [isEditing, setIsEditing] = useState(isNew);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const { data: project, isLoading: isFetching } = useGetProjectByIdQuery(
        id!,
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
        if (project && !isNew) {
            reset(project, { keepDefaultValues: false });
        }
    }, [project, isNew, reset]);

    const onSave = async (data: Project) => {
        try {
            if (isNew) {
                const res = await createProject(data).unwrap();
                if (res.id) void navigate(`${PATHS.PROJECTS}/${res.id}`);
            } else {
                const keys = Object.keys(dirtyFields) as Array<keyof Project>;
                if (keys.length === 0) {
                    setIsEditing(false);
                    return;
                }

                const payload: Partial<Project> = {};
                keys.forEach((key) => {
                    (payload as Record<keyof Project, Project[keyof Project]>)[
                        key
                    ] = data[key];
                });

                await updateProject({
                    id: id!,
                    body: payload as Project,
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
        project,
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
                    id: id!,
                    body: { is_archived: false } as Project,
                }).unwrap();
            } catch {
                setSnackbarOpen(true);
            }
        },
        navigate,
        setValue,
    };
};
