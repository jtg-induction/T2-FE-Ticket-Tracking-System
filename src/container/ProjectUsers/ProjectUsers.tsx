import { FormEvent, useMemo, useState } from 'react';

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
    ErrorSnackbar,
    HighlightTextMatch,
    LoadingOverlay,
    ROLE_HIERARCHY,
    UserAction,
    UserCard,
} from '@component';
import { PAGE_SIZE, PATHS } from '@constant';
import { useProjectUsers } from '@hook';
import { ProjectRole } from '@type';

export const ProjectUsers = () => {
    const { spacing } = useTheme();
    const [page, setPage] = useState(1);

    const {
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
        memberActionLoading,
        fetchError,
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
    } = useProjectUsers();

    const totalPages = useMemo(() => {
        const count = members.length > 0 ? members.length * page : 0;
        return Math.ceil(count / PAGE_SIZE);
    }, [members, page]);

    if (!projectId || projectId === 'new') return null;

    const onInviteSubmit = (e: FormEvent) => {
        e.preventDefault();
        void handleInvite();
    };

    return (
        <Paper sx={{ height: '100%', minWidth: '420px' }}>
            {memberActionLoading && <LoadingOverlay />}

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
                            {membersLoading
                                ? 'Loading...'
                                : `${members.length} members shown`}
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

                <Box component="form" onSubmit={onInviteSubmit} mt={2}>
                    <Stack direction="row" spacing={1}>
                        <Autocomplete
                            fullWidth
                            size="small"
                            forcePopupIcon={false}
                            open={searchValue.length > 0}
                            filterOptions={(options) => options}
                            options={searchOptions}
                            loading={isSearching}
                            value={selectedUser}
                            noOptionsText={
                                searchValue.length === 0
                                    ? null
                                    : 'No users found'
                            }
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

                                return (
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
                                                opacity: isMember ? 0.6 : 1,
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
                                                            fontSize: '1.2rem',
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
                                        {isLast &&
                                            hasMore &&
                                            searchResponse?.meta.next && (
                                                <Button
                                                    fullWidth
                                                    size="small"
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        setNextCursor(
                                                            getCursorFromUrl(
                                                                searchResponse
                                                                    ?.meta
                                                                    ?.next,
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
                                <CircularProgress size={20} color="inherit" />
                            ) : (
                                <SendIcon />
                            )}
                        </Button>
                    </Stack>
                </Box>
            </Box>

            <Divider />

            <Box flexGrow={1}>
                {membersLoading ? (
                    <Stack alignItems="center" py={6}>
                        <CircularProgress size={28} />
                    </Stack>
                ) : fetchError ? (
                    <Stack alignItems="center" py={6} px={3}>
                        <Typography color="error">
                            Failed to load members
                        </Typography>
                    </Stack>
                ) : (
                    <Stack spacing={0}>
                        {membersFetching && (
                            <CircularProgress size={20} sx={{ m: '0 auto' }} />
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
                                        void navigate(
                                            `${PATHS.PROFILE}/${user.user_id}`,
                                        )
                                    }
                                    onMenuOpen={(e) => {
                                        e.stopPropagation();
                                        setMenuAnchorEl({
                                            userId: user.user_id,
                                            el: e.currentTarget,
                                        });
                                    }}
                                    onMenuClose={() => setMenuAnchorEl(null)}
                                    onActionClick={(action, id) => {
                                        setMenuAnchorEl(null);
                                        void handleAction(action, id);
                                    }}
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
                                void handleAction(
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
