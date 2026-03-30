import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

import { useDebounce } from '@hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTicketSchema } from '@schema';
import {
    useGetProjectsQuery,
    useSubscribeToTicketMutation,
    useUnsubscribeFromTicketMutation,
} from '@service';
import {
    useGetProjectMembersQuery,
    useGetTicketByIdQuery,
    useUpdateTicketMutation,
} from '@service';
import { ErrorResponse, Project } from '@type';
import { CreateTicketInput } from '@type/ticket.types';

export const useTicketDetail = () => {
    const { projectId, ticketId } = useParams<{
        projectId: string;
        ticketId: string;
    }>();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [updateError, setUpdateError] = useState<ErrorResponse | null>(null);
    const debouncedSearch = useDebounce(searchTerm, 500);

    const [projectSearch, setProjectSearch] = useState('');
    const debouncedProjectSearch = useDebounce(projectSearch, 500);

    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null,
    );

    const { data: projectsRes, isFetching: isSearchingProjects } =
        useGetProjectsQuery(
            {
                page: 1,
                search: debouncedProjectSearch,
                archived: false,
                pageSize: 5,
            },
            { skip: !isEditing },
        );

    const projects = projectsRes?.success ? projectsRes.data : [];

    const {
        data: response,
        isLoading,
        error: fetchTicketError,
        refetch: refetchTicket,
    } = useGetTicketByIdQuery(
        { projectId: projectId!, ticketId: ticketId! },
        { skip: !projectId || !ticketId },
    );

    const [subscribeToTicket, { isLoading: isSubscribing }] =
        useSubscribeToTicketMutation();
    const [unsubscribeFromTicket, { isLoading: isUnsubscribing }] =
        useUnsubscribeFromTicketMutation();

    const ticket = response?.data;
    const role = ticket?.ticket_role;

    const {
        data: membersRes,
        isFetching: isSearching,
        error: fetchMemberError,
        refetch: refetchMember,
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
            name: ticket?.name ?? '',
            description: ticket?.description ?? '',
            priority: ticket?.priority,
            category: ticket?.category,
            status: ticket?.status,
            deadline: ticket?.deadline
                ? new Date(ticket.deadline).toISOString().slice(0, 16)
                : null,
            assignee: ticket?.assignee?.user_id ?? '',
            project: ticket?.project_details?.id ?? '',
        },
    });

    const { isDirty, isValid } = form.formState;
    const { setError, reset } = form;

    useEffect(() => {
        if (ticket) {
            const initialProject = ticket.project_details ?? null;
            setSelectedProject(initialProject);

            if (isEditing) {
                reset({
                    name: ticket.name ?? '',
                    description: ticket.description ?? '',
                    priority: ticket.priority,
                    category: ticket.category,
                    status: ticket.status,
                    deadline: ticket.deadline
                        ? new Date(ticket.deadline).toISOString().slice(0, 16)
                        : null,
                    assignee: ticket.assignee?.user_id ?? '',
                    project: initialProject?.id ?? '',
                });
            }
        }
    }, [ticket, isEditing, reset]);

    const canEditFields = ['reporter', 'admin'].includes(role || '');
    const canEditStatus = ['reporter', 'admin', 'assignee'].includes(
        role || '',
    );
    const canViewEditButton = role !== 'member';

    const handleSubscriptionToggle = async () => {
        if (!ticketId || !projectId) return;
        try {
            if (ticket?.is_subscribed) {
                await unsubscribeFromTicket({ ticketId, projectId }).unwrap();
            } else {
                await subscribeToTicket({ ticketId, projectId }).unwrap();
            }
        } catch (err) {
            setUpdateError(err as ErrorResponse);
        }
    };

    const onSave = async (data: CreateTicketInput) => {
        if (!isDirty) {
            setIsEditing(false);
            return;
        }
        try {
            setUpdateError(null);
            const { assignee, deadline, project, ...rest } = data;

            const body = {
                ...rest,
                project,
                name: rest.name.trim(),
                description: rest.description?.trim() ?? '',
                assignee: assignee ?? '',
                deadline: deadline
                    ? deadline.length === 16
                        ? `${deadline}:00Z`
                        : deadline
                    : null,
            };

            await updateTicket({
                projectId: projectId!,
                ticketId: ticketId!,
                body,
            }).unwrap();

            if (project !== projectId) {
                void navigate(`/projects/${project}/tickets/${ticketId}`, {
                    replace: true,
                });
            }

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
        projects,
        isSearchingProjects,
        setProjectSearch,
        projectSearch,
        selectedProject,
        setSelectedProject,
        ticket,
        isEditing,
        setIsEditing,
        form,
        isDirty,
        isValid,
        isLoading,
        isUpdating,
        members,
        onSave: form.handleSubmit(onSave),
        permissions: { canEditFields, canEditStatus, canViewEditButton, role },
        isSearching,
        setSearchTerm,
        fetchError: fetchTicketError || fetchMemberError,
        refetch: () => {
            if (fetchTicketError) refetchTicket();
            if (fetchMemberError) refetchMember();
        },
        updateError,
        clearUpdateError: () => setUpdateError(null),
        isSubscribed: ticket?.is_subscribed ?? false,
        isSubscribing: isSubscribing || isUnsubscribing,
        handleSubscriptionToggle,
    };
};
