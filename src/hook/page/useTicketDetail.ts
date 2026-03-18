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
    const [error, setError] = useState<ErrorResponse | null>(null);
    const debouncedSearch = useDebounce(searchTerm, 500);

    const { data: response, isLoading } = useGetTicketByIdQuery(
        { projectId: projectId!, ticketId: ticketId! },
        { skip: !ticketId },
    );

    const ticket = response?.data;
    const role = ticket?.ticket_role;

    const { data: membersRes, isFetching: isSearching } =
        useGetProjectMembersQuery({
            id: projectId!,
            page: 1,
            search: debouncedSearch,
        });
    const members = membersRes?.success ? membersRes.data : [];

    const [updateTicket, { isLoading: isUpdating }] = useUpdateTicketMutation();

    const form = useForm<CreateTicketInput>({
        resolver: zodResolver(CreateTicketSchema),
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
    }, [ticket, isEditing, form]);

    const canEditFields = ['reporter', 'admin'].includes(role || '');
    const canEditStatus = ['reporter', 'admin', 'assignee'].includes(
        role || '',
    );
    const canViewEditButton = role !== 'member';

    const onSave = async (data: CreateTicketInput) => {
        try {
            setError(null);
            const { assignee, ...rest } = data;
            const body: Partial<CreateTicketInput> & { assignee?: string } = {
                ...rest,
            };

            body.assignee = assignee || '';

            await updateTicket({
                projectId: projectId!,
                ticketId: ticketId!,
                body,
            }).unwrap();
            setIsEditing(false);
        } catch (err) {
            setError(err as ErrorResponse);
        }
    };

    return {
        ticket,
        isEditing,
        setIsEditing,
        form,
        isLoading,
        isUpdating,
        members,
        onSave: form.handleSubmit(onSave),
        permissions: { canEditFields, canEditStatus, canViewEditButton, role },
        isSearching,
        setSearchTerm,
        error,
        clearError: () => setError(null),
    };
};
