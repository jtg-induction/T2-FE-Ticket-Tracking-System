import {
    ErrorSnackbar,
    HighlightTextMatch,
    ROLE_HIERARCHY,
    UserAction,
    UserCard,
} from '@component';
import { PAGE_SIZE, PATHS } from '@constant';
import { useDebounce } from '@hook';
import {
    Done,
    Logout as LogoutIcon,
    Send as SendIcon,
} from '@mui/icons-material';
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Pagination,
    Paper,
    Snackbar,
    Stack,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import {
    useGetProjectMembersQuery,
    useInviteMemberMutation,
    useListAllUsersQuery,
    useRemoveMemberMutation,
    useUpdateMemberRoleMutation,
} from '@service';
import { ErrorResponse, ProjectMember, ProjectRole } from '@type';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export const ProjectUsers = () => {
    const { spacing } = useTheme();
    const navigate = useNavigate();
    const { projectId } = useParams<{ projectId: string }>();

    const [searchValue, setSearchValue] = useState('');
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<ProjectMember | null>(
        null,
    );
    const [menuAnchorEl, setMenuAnchorEl] = useState<{
        userId: string;
        el: HTMLElement;
    } | null>(null);
    const [page, setPage] = useState(1);
    const [actionError, setActionError] = useState<ErrorResponse | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);

    const debouncedSearch = useDebounce(searchValue, 500);

    const { data: searchResponse, isFetching: isSearching } =
        useListAllUsersQuery(
            {
                projectId: projectId!,
                search: debouncedSearch,
                cursor: nextCursor,
            },
            { skip: !projectId || debouncedSearch.length < 2 },
        );

    const {
        data: response,
        isLoading,
        isFetching,
        error: fetchError,
    } = useGetProjectMembersQuery(
        { id: projectId!, page },
        { skip: !projectId || projectId === 'new' },
    );

    const [inviteMember, { isLoading: isInviting }] = useInviteMemberMutation();
    const [removeMember] = useRemoveMemberMutation();
    const [updateRole] = useUpdateMemberRoleMutation();

    const searchOptions = useMemo(() => {
        if (isSearching && !nextCursor) return [];
        if (debouncedSearch.length < 2) return [];
        return searchResponse?.data || [];
    }, [searchResponse, isSearching, nextCursor, debouncedSearch]);

    const hasMore = debouncedSearch.length >= 2 && !!searchResponse?.meta?.next;
    const members = response?.data || [];
    const meta = response?.meta ?? null;
    const totalPages = useMemo(
        () => (meta ? Math.ceil(meta.count / PAGE_SIZE) : 0),
        [meta],
    );
    const currentUser = useMemo(
        () => (page === 1 ? members[0] : null),
        [members, page],
    );

    useEffect(() => {
        setNextCursor(null);
    }, [debouncedSearch]);

    const getCursorFromUrl = (url: string | null) => {
        if (!url) return null;
        return new URL(url).searchParams.get('cursor');
    };

    const handleInvite = async (e: FormEvent) => {
        e.preventDefault();
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
                const roleMap: Partial<Record<UserAction, ProjectRole>> = {
                    [UserAction.MakeOwner]: ProjectRole.Owner,
                    [UserAction.MakeAdmin]: ProjectRole.Admin,
                    [UserAction.RevokeAdmin]: ProjectRole.Member,
                };
                const newRole = roleMap[action];
                if (newRole) {
                    await updateRole({
                        projectId,
                        userId: targetUserId,
                        projectRole: newRole,
                    }).unwrap();
                }
            }
        } catch (err) {
            setActionError(err as ErrorResponse);
        }
    };

    if (!projectId || projectId === 'new') return null;

    return (
        <Paper sx={{ height: '100%' }}>
            <Box p={spacing(4)}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Stack>
                        <Typography variant="body1" fontWeight="bold">
                            Project Members
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            {isLoading
                                ? 'Loading...'
                                : `${meta?.count || 0} members total`}
                        </Typography>
                    </Stack>
                    <Tooltip title="Leave Project">
                        <IconButton
                            color="error"
                            onClick={() => setLeaveDialogOpen(true)}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>

                <Box component="form" onSubmit={handleInvite} mt={2}>
                    <Stack direction="row" spacing={1}>
                        <Autocomplete
                            fullWidth
                            size="small"
                            forcePopupIcon={false}
                            filterOptions={(options) => options}
                            options={searchOptions}
                            loading={isSearching}
                            value={selectedUser}
                            inputValue={searchValue}
                            onInputChange={(_, val) => {
                                setSearchValue(val);
                                setNextCursor(null);
                            }}
                            onChange={(_, val) => {
                                if (val?.is_project_member) {
                                    setActionError({
                                        success: false,
                                        message: 'Already a member',
                                    });
                                    return;
                                }
                                setSelectedUser(val);
                            }}
                            getOptionLabel={(o) =>
                                `${o.first_name} ${o.last_name}`
                            }
                            isOptionEqualToValue={(o, v) =>
                                o.user_id === v.user_id
                            }
                            renderOption={(props, option, state) => {
                                const { key, ...optionProps } = props;
                                const isLast =
                                    state.index === searchOptions.length - 1;
                                const isMember = option.is_project_member;
                                const content = (
                                    <Box key={key}>
                                        <Stack
                                            direction="row"
                                            component="li"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            {...optionProps}
                                            sx={{
                                                pointerEvents: isMember
                                                    ? 'none'
                                                    : 'auto',
                                            }}
                                        >
                                            <Stack spacing={0.2}>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight={500}
                                                >
                                                    {HighlightTextMatch(
                                                        `${option.first_name} ${option.last_name}`,
                                                        searchValue,
                                                    )}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    color="textSecondary"
                                                >
                                                    {HighlightTextMatch(
                                                        option.email,
                                                        searchValue,
                                                    )}
                                                </Typography>
                                            </Stack>
                                            {isMember && (
                                                <Stack
                                                    direction="row"
                                                    spacing={0.5}
                                                    alignItems="center"
                                                >
                                                    <Done
                                                        color="success"
                                                        sx={{
                                                            fontSize: '1.5rem',
                                                        }}
                                                    />
                                                    <Typography
                                                        variant="caption"
                                                        color="success.dark"
                                                    >
                                                        Member
                                                    </Typography>
                                                </Stack>
                                            )}
                                        </Stack>
                                        {isLast && hasMore && (
                                            <Button
                                                fullWidth
                                                size="small"
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    setNextCursor(
                                                        getCursorFromUrl(
                                                            searchResponse?.meta
                                                                .next,
                                                        ),
                                                    );
                                                }}
                                            >
                                                {isSearching
                                                    ? 'Loading...'
                                                    : 'Load More'}
                                            </Button>
                                        )}
                                        <Divider />
                                    </Box>
                                );
                                return isMember ? (
                                    <Tooltip
                                        key={key}
                                        title="User is already in this project"
                                        placement="left"
                                        arrow
                                    >
                                        <div style={{ cursor: 'not-allowed' }}>
                                            {content}
                                        </div>
                                    </Tooltip>
                                ) : (
                                    content
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Search users to invite..."
                                    slotProps={{
                                        input: {
                                            ...params.InputProps,
                                            endAdornment: isSearching ? (
                                                <CircularProgress size={20} />
                                            ) : (
                                                params.InputProps.endAdornment
                                            ),
                                        },
                                    }}
                                />
                            )}
                        />
                        <Button
                            variant="contained"
                            disabled={isInviting || !selectedUser}
                            type="submit"
                        >
                            {isInviting ? (
                                <CircularProgress size={20} />
                            ) : (
                                <SendIcon />
                            )}
                        </Button>
                    </Stack>
                    {searchValue.length > 0 && searchValue.length < 2 && (
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            sx={{ mt: 0.5, display: 'block' }}
                        >
                            Type at least 2 characters to search...
                        </Typography>
                    )}
                </Box>
            </Box>

            <Divider />

            <Box flexGrow={1} position="relative">
                {isLoading ? (
                    <Stack alignItems="center" justifyContent="center" py={6}>
                        <CircularProgress size={28} />
                    </Stack>
                ) : fetchError ? (
                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        py={6}
                        px={3}
                    >
                        <Typography
                            variant="body2"
                            color="error"
                            fontWeight={600}
                        >
                            {'message' in fetchError
                                ? fetchError.message
                                : 'Failed to load members'}
                        </Typography>
                    </Stack>
                ) : (
                    <Stack spacing={0}>
                        {isFetching && (
                            <Box display="flex" justifyContent="center">
                                <CircularProgress size={24} />
                            </Box>
                        )}
                        {members.map((user) => {
                            const myRole =
                                currentUser?.projectRole ?? ProjectRole.Member;
                            const myRoleVal = ROLE_HIERARCHY[myRole] ?? 0;
                            const userRoleVal =
                                ROLE_HIERARCHY[user.projectRole] ?? 0;
                            return (
                                <UserCard
                                    key={user.user_id}
                                    userId={user.user_id}
                                    firstName={user.first_name}
                                    lastName={user.last_name}
                                    email={user.email}
                                    role={user.projectRole}
                                    showMenu={myRoleVal > userRoleVal}
                                    canMakeOwner={myRole === ProjectRole.Owner}
                                    canMakeAdmin={
                                        (myRole === ProjectRole.Owner ||
                                            myRole === ProjectRole.Admin) &&
                                        user.projectRole !== ProjectRole.Admin
                                    }
                                    canRevokeAdmin={
                                        myRole === ProjectRole.Owner &&
                                        user.projectRole === ProjectRole.Admin
                                    }
                                    anchorEl={
                                        menuAnchorEl?.userId === user.user_id
                                            ? menuAnchorEl.el
                                            : null
                                    }
                                    onCardClick={() =>
                                        navigate(
                                            `${PATHS.PROFILE}/${user.user_id}`,
                                        )
                                    }
                                    onMenuOpen={(e) =>
                                        setMenuAnchorEl({
                                            userId: user.user_id,
                                            el: e.currentTarget,
                                        })
                                    }
                                    onMenuClose={() => setMenuAnchorEl(null)}
                                    onActionClick={handleAction}
                                />
                            );
                        })}
                    </Stack>
                )}
            </Box>

            {totalPages > 1 && (
                <Box display="flex" p={2} justifyContent="center">
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, v) => setPage(v)}
                        size="small"
                        color="primary"
                        shape="rounded"
                    />
                </Box>
            )}

            <ErrorSnackbar
                error={actionError}
                onClose={() => setActionError(null)}
            />
            <Snackbar
                open={Boolean(successMessage)}
                autoHideDuration={4000}
                onClose={() => setSuccessMessage(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    severity="success"
                    variant="filled"
                    onClose={() => setSuccessMessage(null)}
                    sx={{ width: '100%' }}
                >
                    {successMessage}
                </Alert>
            </Snackbar>

            <Dialog
                open={leaveDialogOpen}
                onClose={() => setLeaveDialogOpen(false)}
            >
                <DialogTitle>Leave Project</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to leave this project?
                    </Typography>
                    <Typography variant="body2" color="error">
                        You will lose access unless re-invited.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 4 }}>
                    <Button onClick={() => setLeaveDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                            setLeaveDialogOpen(false);
                            if (currentUser?.user_id)
                                handleAction(
                                    UserAction.RemoveUser,
                                    currentUser.user_id,
                                );
                        }}
                    >
                        Leave
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};
