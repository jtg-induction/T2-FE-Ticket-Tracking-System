import { useEffect, useState } from 'react';

import { useParams } from 'react-router';

import { useGetUserByIdQuery, useUpdateUserMutation } from '@service';
import { EditProfileRequest } from '@type';
import { resolveApiError } from '@util';

export const useProfileForm = () => {
    const { id } = useParams<{ id: string }>();
    const [isEditing, setIsEditing] = useState(false);
    const [saveError, setSaveError] = useState('');

    useEffect(() => {
        if (saveError) {
            const timer = setTimeout(() => {
                setSaveError('');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [saveError]);

    const { data: profile, isLoading, error } = useGetUserByIdQuery(id ?? '');
    useEffect(() => {}, [profile]);

    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

    const [tempProfile, setTempProfile] = useState({
        firstName: '',
        lastName: '',
        role: '',
        dob: '',
        about: '',
        jiraApiToken: '',
    });

    useEffect(() => {
        if (profile) {
            setTempProfile({
                firstName: profile.first_name || '',
                lastName: profile.last_name || '',
                role: profile.role || '',
                dob: profile.dob || '',
                about: profile.about || '',
                jiraApiToken: '',
            });
        }
    }, [profile]);

    const handleSave = async () => {
        try {
            setSaveError('');
            const body: EditProfileRequest = {
                first_name: tempProfile.firstName,
                last_name: tempProfile.lastName,
                role: tempProfile.role,
                dob: tempProfile.dob || null,
                about: tempProfile.about || null,
            };

            if (tempProfile.jiraApiToken.trim()) {
                body.jira_api_token = tempProfile.jiraApiToken.trim();
            }

            await updateUser({ body }).unwrap();
            setTempProfile((prev) => ({ ...prev, jiraApiToken: '' }));
            setIsEditing(false);
        } catch (err) {
            setSaveError(resolveApiError(err));
        }
    };

    return {
        profile: profile,
        tempProfile,
        isEditing,
        canUserEdit: profile?.canEdit ?? false,
        loading: isLoading || isUpdating,
        fetchError: error ? resolveApiError(error) : null,
        saveError,
        handleToggleEdit: () => {
            if (isEditing && profile) {
                setTempProfile({
                    firstName: profile.first_name,
                    lastName: profile.last_name,
                    role: profile.role,
                    dob: profile.dob || '',
                    about: profile.about || '',
                    jiraApiToken: '',
                });
            }
            setIsEditing(!isEditing);
        },
        handleChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setTempProfile({ ...tempProfile, [e.target.name]: e.target.value }),
        handleSave,
    };
};
