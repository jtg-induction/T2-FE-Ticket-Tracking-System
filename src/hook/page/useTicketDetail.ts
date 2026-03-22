import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';

import { useDebounce } from '@hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTicketSchema } from '@schema';
import {
    useGetProjectMembersQuery,
    useGetTicketByIdQuery,
    useUpdateTicketMutation,
} from '@service';
import { ErrorResponse } from '@type';
import { CreateTicketInput } from '@type/ticket.types';

export const useTicketDetail = () => {
    const { projectId, ticketId } = useParams<{
        projectId: string;
        ticketId: string;
    }>();
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [updateError, setUpdateError] = useState<ErrorResponse | null>(null);
    const debouncedSearch = useDebounce(searchTerm, 500);

    const {
        data: response,
        isLoading,
        error: fetchTicketError,
    } = useGetTicketByIdQuery(
        { projectId: projectId!, ticketId: ticketId! },
        { skip: !projectId || !ticketId },
    );

    const ticket = response?.data;
    const role = ticket?.ticket_role;

    const {
        data: membersRes,
        isFetching: isSearching,
        error: fetchMemberError,
    } = useGetProjectMembersQuery({
        id: projectId!,
        page: 1,
        search: debouncedSearch,
    });
    const members = membersRes?.success ? membersRes.data : [];

    const [updateTicket, { isLoading: isUpdating }] = useUpdateTicketMutation();

    const form = useForm<CreateTicketInput>({
        resolver: zodResolver(CreateTicketSchema),
        mode: 'onChange',
        defaultValues: {
            name: ticket?.name,
            description: ticket?.description,
            priority: ticket?.priority,
            category: ticket?.category,
            status: ticket?.status,
            deadline: ticket?.deadline
                ? new Date(ticket.deadline).toISOString().slice(0, 16)
                : null,
            assignee: ticket?.assignee?.user_id || '',
        },
    });

    const { isDirty } = form.formState;
    const { setError } = form;

    useEffect(() => {
        if (ticket && isEditing) {
            form.reset({
                name: ticket.name,
                description: ticket.description,
                priority: ticket.priority,
                category: ticket.category,
                status: ticket.status,
                deadline: ticket.deadline
                    ? new Date(ticket.deadline).toISOString().slice(0, 16)
                    : null,
                assignee: ticket.assignee?.user_id,
            });
        }
    }, [ticket, isEditing, form.reset]);

    const canEditFields = ['reporter', 'admin'].includes(role || '');
    const canEditStatus = ['reporter', 'admin', 'assignee'].includes(
        role || '',
    );
    const canViewEditButton = role !== 'member';

    const onSave = async (data: CreateTicketInput) => {
        if (!isDirty) {
            setIsEditing(false);
            return;
        }
        try {
            setUpdateError(null);
            const { assignee, ...rest } = data;
            const body = { ...rest, assignee: assignee || '' };

            await updateTicket({
                projectId: projectId!,
                ticketId: ticketId!,
                body,
            }).unwrap();

            setIsEditing(false);
            form.reset(data);
        } catch (err) {
            const apiError = err as ErrorResponse;
            setUpdateError(apiError);
            if (apiError.errors) {
                Object.entries(apiError.errors).forEach(([key, messages]) => {
                    setError(key as keyof CreateTicketInput, {
                        type: 'server',
                        message: Array.isArray(messages)
                            ? messages[0]
                            : (messages as string),
                    });
                });
            }
        }
    };

    return {
        ticket,
        isEditing,
        setIsEditing,
        form,
        isDirty,
        isLoading,
        isUpdating,
        members,
        onSave: form.handleSubmit(onSave),
        permissions: { canEditFields, canEditStatus, canViewEditButton, role },
        isSearching,
        setSearchTerm,
        fetchError: fetchTicketError || fetchMemberError,
        updateError,
        clearUpdateError: () => setUpdateError(null),
    };
};
