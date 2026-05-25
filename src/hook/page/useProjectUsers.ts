import { useEffect, useMemo, useState } from 'react';

import { useNavigate, useParams } from 'react-router';

import { UserAction } from '@component';
import { useDebounce } from '@hook';
import {
    useGetProjectMembersQuery,
    useInviteMemberMutation,
    useListAllUsersQuery,
    useRemoveMemberMutation,
    useUpdateMemberRoleMutation,
} from '@service';
import { ErrorResponse, ProjectMember } from '@type';

export const useProjectUsers = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState('');
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<ProjectMember | null>(
        null,
    );
    const [actionError, setActionError] = useState<ErrorResponse | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
    const [menuAnchorEl, setMenuAnchorEl] = useState<{
        userId: string;
        el: HTMLElement;
    } | null>(null);

    const debouncedSearch = useDebounce(searchValue, 500);

    const { data: searchResponse, isFetching: isSearching } =
        useListAllUsersQuery(
            {
                projectId: projectId!,
                search: debouncedSearch,
                cursor: nextCursor,
            },
            { skip: !projectId },
        );

    const {
        data: memberResponse,
        isLoading: membersLoading,
        isFetching: membersFetching,
        error: fetchError,
        refetch,
    } = useGetProjectMembersQuery({ id: projectId!, page: 1 });

    const [inviteMember, { isLoading: isInviting }] = useInviteMemberMutation();
    const [removeMember, { isLoading: removeLoading }] =
        useRemoveMemberMutation();
    const [updateRole, { isLoading: updateLoading }] =
        useUpdateMemberRoleMutation();

    const searchOptions = useMemo(() => {
        if (!debouncedSearch) return [];

        if (isSearching && !nextCursor) {
            return [];
        }

        return searchResponse?.data || [];
    }, [searchResponse, isSearching, debouncedSearch, nextCursor]);

    const hasMore = !!searchResponse?.meta?.next;
    const members = memberResponse?.data || [];
    const currentUser = members[0];

    useEffect(() => {
        setNextCursor(null);
    }, [debouncedSearch]);

    const handleInvite = async () => {
        if (!selectedUser || !projectId) return;
        try {
            const res = await inviteMember({
                projectId,
                userId: selectedUser.user_id,
                email: selectedUser.email,
            }).unwrap();
            setSuccessMessage(res.message || 'User added successfully');
            setSelectedUser(null);
            setSearchValue('');
        } catch (err) {
            setActionError(err as ErrorResponse);
        }
    };

    const handleAction = async (action: UserAction, targetUserId: string) => {
        if (!projectId) return;
        try {
            if (action === UserAction.RemoveUser) {
                await removeMember({
                    projectId,
                    userId: targetUserId,
                }).unwrap();
            } else {
                const roleMap = {
                    [UserAction.MakeOwner]: 'owner',
                    [UserAction.MakeAdmin]: 'admin',
                    [UserAction.RevokeAdmin]: 'member',
                };
                await updateRole({
                    projectId,
                    userId: targetUserId,
                    projectRole: roleMap[action],
                }).unwrap();
            }
        } catch (err) {
            setActionError(err as ErrorResponse);
        }
    };

    const getCursorFromUrl = (url: string | null) =>
        url ? new URL(url).searchParams.get('cursor') : null;

    return {
        projectId,
        searchValue,
        setSearchValue,
        selectedUser,
        setSelectedUser,
        searchOptions,
        hasMore,
        isSearching,
        isInviting,
        members,
        membersLoading,
        membersFetching,
        memberActionLoading: updateLoading || removeLoading,
        fetchError,
        refetch,
        actionError,
        setActionError,
        successMessage,
        setSuccessMessage,
        leaveDialogOpen,
        setLeaveDialogOpen,
        menuAnchorEl,
        setMenuAnchorEl,
        currentUser,
        handleInvite,
        handleAction,
        getCursorFromUrl,
        setNextCursor,
        searchResponse,
        navigate,
    };
};
