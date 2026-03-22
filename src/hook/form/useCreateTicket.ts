import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { TicketPriority, TicketStatus } from '@constant';
import { useDebounce } from '@hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTicketSchema } from '@schema';
import { useCreateTicketMutation, useGetProjectMembersQuery } from '@service';
import { CreateTicketInput, ErrorResponse } from '@type';

export const useCreateTicket = (
    projectId: string,
    onSuccess: () => void,
    initialStatus: TicketStatus,
) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<ErrorResponse | null>(null);
    const debouncedSearch = useDebounce(searchTerm, 500);

    const { data: memberRes, isFetching: isSearching } =
        useGetProjectMembersQuery({
            id: projectId,
            page: 1,
            search: debouncedSearch,
        });

    const [createTicket, { isLoading: isSubmitting }] =
        useCreateTicketMutation();

    const form = useForm<CreateTicketInput>({
        resolver: zodResolver(CreateTicketSchema),
        defaultValues: {
            priority: TicketPriority.Medium,
            category: 'Development',
            status: initialStatus,
        },
    });

    const onSubmit = async (data: CreateTicketInput) => {
        try {
            setError(null);
            const requestBody: Partial<CreateTicketInput> = { ...data };

            if (!requestBody.deadline || requestBody.deadline.trim() === '') {
                delete requestBody.deadline;
            }

            if (!requestBody.assignee || requestBody.assignee.trim() === '') {
                delete requestBody.assignee;
            }

            await createTicket({
                projectId,
                body: requestBody as CreateTicketInput,
            }).unwrap();

            form.reset();
            onSuccess();
        } catch (err) {
            if (err && typeof err === 'object' && 'message' in err) {
                setError(err as ErrorResponse);
            } else {
                setError({
                    success: false,
                    message: 'An unexpected error occurred',
                } as ErrorResponse);
            }
        }
    };

    const members =
        memberRes?.success && Array.isArray(memberRes.data)
            ? memberRes.data
            : [];

    return {
        form,
        onSubmit: form.handleSubmit(onSubmit),
        members,
        isSearching,
        isSubmitting,
        setSearchTerm,
        error,
        clearError: () => setError(null),
    };
};
