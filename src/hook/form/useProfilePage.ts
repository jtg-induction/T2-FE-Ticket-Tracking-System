import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '@schema';
import { useGetUserByIdQuery, useUpdateUserMutation } from '@service';
import { EditProfileRequest, ErrorResponse } from '@type';

export const useProfileForm = (id: string) => {
    const [isEditing, setIsEditing] = useState(false);
    const [saveError, setSaveError] = useState('');

    const {
        data: profile,
        isLoading,
        error: fetchError,
    } = useGetUserByIdQuery(id);
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isDirty, dirtyFields },
    } = useForm<EditProfileRequest>({
        resolver: zodResolver(profileSchema),
    });

    const formValues = watch();

    useEffect(() => {
        if (profile) {
            reset({
                first_name: profile.first_name || '',
                last_name: profile.last_name || '',
                role: profile.role || '',
                dob: profile.dob ? profile.dob.split('T')[0] : '',
                about: profile.about || '',
                jira_api_token: '',
            });
        }
    }, [profile, reset]);

    const onSave = async (values: EditProfileRequest) => {
        try {
            setSaveError('');

            const payload: Partial<EditProfileRequest> = {};
            const dirtyKeys = Object.keys(dirtyFields) as Array<
                keyof EditProfileRequest
            >;

            dirtyKeys.forEach((key) => {
                const value = values[key];
                payload[key] = value ?? '';
            });

            if (Object.keys(payload).length > 0) {
                await updateUser({
                    body: payload as EditProfileRequest,
                }).unwrap();
            }

            setIsEditing(false);
        } catch (err) {
            setSaveError(
                (err as ErrorResponse).message || 'Failed to update profile',
            );
        }
    };

    return {
        profile,
        isEditing,
        errors,
        register,
        canUserEdit: profile?.can_edit ?? false,
        formValues,
        isDirty,
        loading: isLoading || isUpdating,
        fetchError,
        saveError,
        handleToggleEdit: () => {
            if (isEditing) reset();
            setIsEditing(!isEditing);
        },
        handleSave: handleSubmit(onSave),
    };
};
