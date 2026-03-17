import { useEffect, useMemo, useState } from 'react';

import { useParams } from 'react-router';

import { Add as AddIcon, Logout as LogoutIcon } from '@mui/icons-material';
import {
    Alert,
    Box,
    CircularProgress,
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

import { ErrorSnackbar, UserCard } from '@component';
import {
    useGetProjectMembersQuery,
    useInviteMemberMutation,
    useRemoveMemberMutation,
    useUpdateMemberRoleMutation,
} from '@service';
import { ErrorResponse, ProjectMember } from '@type';

const PAGE_SIZE = 5;

export const ProjectUsers = () => {
    const { spacing } = useTheme();
    const { projectId } = useParams<{ projectId: string }>();

    if (!projectId || projectId === 'new') {
        return null;
    }
    const [page, setPage] = useState(1);
    const [inviteEmail, setInviteEmail] = useState('');
    const [activeError, setActiveError] = useState<ErrorResponse | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const {
        data: response,
        isLoading,
        isFetching,
        error: fetchError,
    } = useGetProjectMembersQuery({ id: projectId, page });

    const [removeMember] = useRemoveMemberMutation();
    const [updateRole] = useUpdateMemberRoleMutation();
    const [inviteMember, { isLoading: isInviting }] = useInviteMemberMutation();

    useEffect(() => {
        if (fetchError && 'data' in fetchError) {
            setActiveError(fetchError.data as ErrorResponse);
        }
    }, [fetchError]);

    const members = response && response.success ? response.data : [];
    const meta = response && 'meta' in response ? response.meta : null;

    const totalPages = useMemo(
        () => (meta ? Math.ceil(meta.count / PAGE_SIZE) : 0),
        [meta],
    );

    const [me, setMe] = useState<ProjectMember>();

    useEffect(() => {
        if (page === 1 && members.length > 0) {
            setMe(members[0]);
        }
    }, [members, page]);

    const handleAction = async (action: string, targetUserId: string) => {
        if (!projectId) return;
        try {
            if (action === 'remove_user') {
                await removeMember({
                    projectId,
                    userId: targetUserId,
                }).unwrap();
            } else if (
                action === 'make_admin' ||
                action === 'make_owner' ||
                action === 'revoke_admin'
            ) {
                const newRole =
                    action === 'make_owner'
                        ? 'owner'
                        : action === 'make_admin'
                          ? 'admin'
                          : 'member';

                await updateRole({
                    projectId,
                    userId: targetUserId,
                    projectRole: newRole,
                }).unwrap();
            }
        } catch (err: unknown) {
            const errorObj = err as { data: ErrorResponse };
            if (errorObj.data) setActiveError(errorObj.data);
        }
    };

    const handleInvite = async () => {
        if (!inviteEmail || !projectId) return;
        try {
            const inviteResponse = await inviteMember({
                id: projectId,
                email: inviteEmail,
            }).unwrap();
            setSuccessMessage(
                inviteResponse.message || `Invitation sent to ${inviteEmail}`,
            );
            setInviteEmail('');
        } catch (err: unknown) {
            const errorObj = err as { data: ErrorResponse };
            if (errorObj.data) setActiveError(errorObj.data);
        }
    };

    return (
        <Paper sx={{ minHeight: 400 }}>
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
                            onClick={() =>
                                me?.user_id &&
                                void handleAction('remove_user', me.user_id)
                            }
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>

                <Box>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Invite by email..."
                        value={inviteEmail}
                        onChange={(e) => {
                            setInviteEmail(e.target.value);
                        }}
                        disabled={isInviting}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => void handleInvite()}
                                            disabled={
                                                isInviting || !inviteEmail
                                            }
                                            color="primary"
                                        >
                                            {isInviting ? (
                                                <CircularProgress size={20} />
                                            ) : (
                                                <AddIcon />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </Box>
            </Box>

            <Divider />

            <Box flexGrow={1} position="relative">
                {isFetching && !isLoading ? (
                    <Box display="flex" justifyContent="center" zIndex={1}>
                        <CircularProgress size={24} />
                    </Box>
                ) : (
                    <Stack spacing={0}>
                        {members.map((user) => (
                            <UserCard
                                key={user.user_id}
                                userId={user.user_id}
                                firstName={user.first_name}
                                lastName={user.last_name}
                                role={user.projectRole}
                                myRole={me?.projectRole ?? 'member'}
                                onAction={(action, targetUserId) =>
                                    void handleAction(action, targetUserId)
                                }
                            />
                        ))}
                    </Stack>
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
                error={activeError}
                onClose={() => setActiveError(null)}
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
        </Paper>
    );
};
