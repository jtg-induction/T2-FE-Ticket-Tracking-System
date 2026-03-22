import { MouseEvent, useMemo, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

import { Logout as LogoutIcon, Send as SendIcon } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    InputAdornment,
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
    ErrorSnackbar,
    ROLE_HIERARCHY,
    UserAction,
    UserCard,
} from '@component';
import { PAGE_SIZE, PATHS } from '@constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { inviteMemberSchema } from '@schema';
import {
    useGetProjectMembersQuery,
    useInviteMemberMutation,
    useRemoveMemberMutation,
    useUpdateMemberRoleMutation,
} from '@service';
import {
    ErrorResponse,
    InviteMemberInput,
    ProjectMember,
    ProjectRole,
} from '@type';

export const ProjectUsers = () => {
    const { spacing } = useTheme();
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();

    const [menuAnchorEl, setMenuAnchorEl] = useState<{
        userId: string;
        el: HTMLElement;
    } | null>(null);
    const [page, setPage] = useState(1);
    const [actionError, setActionError] = useState<ErrorResponse | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<InviteMemberInput>({
        resolver: zodResolver(inviteMemberSchema),
        defaultValues: { email: '' },
    });

    const handleCardClick = (userId: string) => {
        void navigate(`${PATHS.PROFILE}/${userId}`);
    };

    const handleMenuOpen = (userId: string, event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setMenuAnchorEl({ userId, el: event.currentTarget });
    };

    const handleMenuClose = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setMenuAnchorEl(null);
    };

    if (!projectId || projectId === 'new') return null;

    const {
        data: response,
        isLoading,
        isFetching,
        error: fetchError,
    } = useGetProjectMembersQuery({ id: projectId, page });

    const [removeMember] = useRemoveMemberMutation();
    const [updateRole] = useUpdateMemberRoleMutation();
    const [inviteMember, { isLoading: isInviting }] = useInviteMemberMutation();

    const members: ProjectMember[] = response?.data || [];
    const meta = response?.meta ?? null;

    const totalPages = useMemo(
        () => (meta ? Math.ceil(meta.count / PAGE_SIZE) : 0),
        [meta],
    );

    const currentUser = useMemo(
        () => (page === 1 ? members[0] : null),
        [members, page],
    );

    const handleInvite = async (data: InviteMemberInput) => {
        try {
            const inviteResponse = await inviteMember({
                id: projectId,
                email: data.email,
            }).unwrap();
            setSuccessMessage(
                inviteResponse.message || `Invitation sent to ${data.email}`,
            );
            reset();
        } catch (err) {
            const error = err as ErrorResponse;
            setError('email', {
                message: error?.message || 'Failed to send invitation',
            });
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
            setActionError(
                (err as ErrorResponse) ?? {
                    success: false,
                    message: 'An unexpected error occurred',
                },
            );
        }
    };

    return (
        <Paper sx={{ height: '100%' }}>
            <Box p={spacing(4)}>
                <Stack
                    flexDirection="row"
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

                <Box
                    component="form"
                    onSubmit={(e) => void handleSubmit(handleInvite)(e)}
                    mt={1}
                >
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Invite by email..."
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        disabled={isInviting}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Tooltip title="Send invite">
                                            <span>
                                                <IconButton
                                                    type="submit"
                                                    disabled={isInviting}
                                                    color="primary"
                                                >
                                                    {isInviting ? (
                                                        <CircularProgress
                                                            size={20}
                                                        />
                                                    ) : (
                                                        <SendIcon fontSize="small" />
                                                    )}
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
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
                            textAlign="center"
                        >
                            {'message' in fetchError
                                ? fetchError.message
                                : 'Failed to load members'}
                        </Typography>
                    </Stack>
                ) : (
                    <>
                        {isFetching && (
                            <Box display="flex" justifyContent="center">
                                <CircularProgress size={24} />
                            </Box>
                        )}
                        <Stack spacing={0}>
                            {members.map((user) => {
                                const myRole: ProjectRole =
                                    currentUser?.projectRole ??
                                    ProjectRole.Member;
                                const userRole = user.projectRole;
                                const myRoleValue = ROLE_HIERARCHY[myRole] ?? 0;
                                const userRoleValue =
                                    ROLE_HIERARCHY[userRole] ?? 0;
                                const showMenu = myRoleValue > userRoleValue;
                                const canMakeOwner =
                                    myRole === ProjectRole.Owner;
                                const canMakeAdmin =
                                    ((myRole === ProjectRole.Owner ||
                                        myRole === ProjectRole.Admin) &&
                                        userRole !== ProjectRole.Admin) ||
                                    (myRole === ProjectRole.Admin &&
                                        userRole === ProjectRole.Member);
                                const canRevokeAdmin =
                                    myRole === ProjectRole.Owner &&
                                    userRole === ProjectRole.Admin;

                                return (
                                    <UserCard
                                        key={user.user_id}
                                        userId={user.user_id}
                                        firstName={user.first_name}
                                        lastName={user.last_name}
                                        role={userRole}
                                        showMenu={showMenu}
                                        canMakeOwner={canMakeOwner}
                                        canMakeAdmin={canMakeAdmin}
                                        canRevokeAdmin={canRevokeAdmin}
                                        anchorEl={
                                            menuAnchorEl?.userId ===
                                            user.user_id
                                                ? menuAnchorEl.el
                                                : null
                                        }
                                        onCardClick={() =>
                                            handleCardClick(user.user_id)
                                        }
                                        onMenuOpen={(e) =>
                                            handleMenuOpen(user.user_id, e)
                                        }
                                        onMenuClose={handleMenuClose}
                                        onActionClick={(action, targetUserId) =>
                                            void handleAction(
                                                action,
                                                targetUserId,
                                            )
                                        }
                                    />
                                );
                            })}
                        </Stack>
                    </>
                )}
            </Box>

            {totalPages > 1 && (
                <>
                    <Divider />
                    <Box display="flex" p={2} justifyContent="center">
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(_, v) => setPage(v)}
                            size="small"
                            color="primary"
                            shape="rounded"
                            siblingCount={0}
                        />
                    </Box>
                </>
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
                        You will lose to the project access unless re-invited.
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
                            if (currentUser?.user_id) {
                                void handleAction(
                                    UserAction.RemoveUser,
                                    currentUser.user_id,
                                );
                            }
                        }}
                    >
                        Leave
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};
