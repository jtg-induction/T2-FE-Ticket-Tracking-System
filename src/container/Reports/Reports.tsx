import { useMemo, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import {
    ArrowBack,
    BarChart,
    Download as DownloadIcon,
} from '@mui/icons-material';
import {
    Autocomplete,
    Box,
    Button,
    Chip,
    CircularProgress,
    Grid2 as Grid,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import {
    CustomIconButton,
    DonutCard,
    ErrorOverlay,
    ErrorSnackbar,
    HighlightTextMatch,
    LoadingOverlay,
    StackedBarCard,
} from '@component';
import { useDebounce, useDocumentTitle, useReport } from '@hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorPage } from '@page';
import { FilterFormValues, filterSchema } from '@schema';
import { useGetProjectMembersQuery } from '@service';

import { ReportsProps } from './reports.types';

export const Reports = ({ userFilter, projectId, userId }: ReportsProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 500);
    const navigate = useNavigate();

    const [submittedFilters, setSubmittedFilters] = useState<FilterFormValues>({
        userIds: [],
        startDate: '',
        endDate: '',
    });

    const {
        register,
        control,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm<FilterFormValues>({
        resolver: zodResolver(filterSchema),
        defaultValues: { userIds: [], startDate: '', endDate: '' },
    });

    const { data: membersResponse, isFetching: membersFetching } =
        useGetProjectMembersQuery(
            { id: projectId!, page: 1, search: debouncedSearch },
            {
                skip:
                    !projectId ||
                    !userFilter ||
                    debouncedSearch.trim().length <= 2,
            },
        );

    const userOptions = useMemo(
        () =>
            membersResponse?.data?.map((m) => ({
                id: m.user_id,
                name: `${m.first_name} ${m.last_name}`,
            })) || [],
        [membersResponse],
    );

    const {
        data,
        loading,
        isFetching,
        priorityKeys,
        reportSubject,
        reportsError,
        error,
        refetch,
        refetchReport,
        handleDownload,
        isDownloading,
        downloadError,
        clearDownloadError,
    } = useReport(projectId, userId, submittedFilters);

    useDocumentTitle(`${reportSubject?.name} | Reports`);

    const onExportClick = () => {
        const values = getValues();
        void handleDownload(values);
    };

    if (error)
        return (
            <ErrorPage
                error={error?.message || 'Failed to load'}
                action={refetch}
                actionLabel="Retry"
            />
        );

    if (reportsError)
        return (
            <ErrorOverlay
                action={refetchReport}
                actionLabel="Retry"
                error={reportsError?.message || 'Failed to load report'}
            />
        );

    return (
        <Paper sx={{ position: 'relative', minHeight: '100%' }}>
            {isFetching || loading ? (
                <LoadingOverlay size={120} />
            ) : (
                <Stack spacing={4} p={4}>
                    <ErrorSnackbar
                        error={downloadError}
                        onClose={clearDownloadError}
                    />

                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        flexWrap="wrap"
                    >
                        <Stack direction="row" alignItems="center" gap={2}>
                            <CustomIconButton
                                variant="standard"
                                onClick={() => void navigate(-1)}
                            >
                                <ArrowBack />
                            </CustomIconButton>
                            {reportSubject ? (
                                <>
                                    <Chip
                                        label={reportSubject.details}
                                        size="small"
                                        color="primary"
                                        sx={{
                                            fontWeight: 800,
                                            borderRadius: 1,
                                        }}
                                    />
                                    <Typography variant="h5" fontWeight="bold">
                                        / {reportSubject.name}
                                    </Typography>
                                </>
                            ) : (
                                <Typography variant="h5" fontWeight="bold">
                                    Insights
                                </Typography>
                            )}
                            <BarChart />
                        </Stack>

                        <Button
                            variant="outlined"
                            startIcon={
                                isDownloading ? (
                                    <CircularProgress size={20} />
                                ) : (
                                    <DownloadIcon />
                                )
                            }
                            onClick={onExportClick}
                            disabled={isDownloading}
                        >
                            {isDownloading ? 'Exporting...' : 'Export PDF'}
                        </Button>
                    </Stack>

                    <Box
                        component="form"
                        onSubmit={handleSubmit(setSubmittedFilters)}
                    >
                        <Grid container spacing={2}>
                            {userFilter && (
                                <Grid size={{ xs: 12, md: 5 }}>
                                    <Controller
                                        name="userIds"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                        }) => (
                                            <Stack spacing={2}>
                                                <Autocomplete
                                                    fullWidth
                                                    forcePopupIcon={false}
                                                    filterOptions={(x) => x}
                                                    options={userOptions}
                                                    getOptionLabel={(option) =>
                                                        option.name || ''
                                                    }
                                                    inputValue={searchTerm}
                                                    onInputChange={(
                                                        _,
                                                        newVal,
                                                    ) => setSearchTerm(newVal)}
                                                    loading={membersFetching}
                                                    open={
                                                        searchTerm.length > 1 &&
                                                        userOptions.length > 0
                                                    }
                                                    onChange={(_, newValue) => {
                                                        if (
                                                            newValue &&
                                                            !value.includes(
                                                                newValue.id,
                                                            )
                                                        ) {
                                                            onChange([
                                                                ...value,
                                                                newValue.id,
                                                            ]);
                                                            setSearchTerm('');
                                                        }
                                                    }}
                                                    isOptionEqualToValue={(
                                                        option,
                                                        v,
                                                    ) => option.id === v?.id}
                                                    renderOption={(
                                                        props,
                                                        option,
                                                    ) => {
                                                        const {
                                                            key,
                                                            ...optionProps
                                                        } = props;
                                                        return (
                                                            <Box
                                                                component="li"
                                                                key={option.id}
                                                                {...optionProps}
                                                            >
                                                                <Stack
                                                                    direction="row"
                                                                    justifyContent="space-between"
                                                                    alignItems="center"
                                                                    width="100%"
                                                                    py={1}
                                                                    px={2}
                                                                >
                                                                    <Typography
                                                                        variant="body2"
                                                                        fontWeight={
                                                                            500
                                                                        }
                                                                    >
                                                                        {HighlightTextMatch(
                                                                            option.name,
                                                                            searchTerm,
                                                                        )}
                                                                    </Typography>
                                                                    {value.includes(
                                                                        option.id,
                                                                    ) && (
                                                                        <Chip
                                                                            label="Selected"
                                                                            size="small"
                                                                            color="primary"
                                                                            variant="outlined"
                                                                            sx={{
                                                                                height: 20,
                                                                                fontSize:
                                                                                    '0.65rem',
                                                                            }}
                                                                        />
                                                                    )}
                                                                </Stack>
                                                            </Box>
                                                        );
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Search and Add Users"
                                                            placeholder="Type name..."
                                                            helperText={
                                                                searchTerm.length >
                                                                    0 &&
                                                                searchTerm.length <=
                                                                    2
                                                                    ? 'Please enter at least 3 characters'
                                                                    : ''
                                                            }
                                                            error={
                                                                searchTerm.length >
                                                                    0 &&
                                                                searchTerm.length <=
                                                                    2
                                                            }
                                                            slotProps={{
                                                                input: {
                                                                    ...params.InputProps,
                                                                    endAdornment:
                                                                        (
                                                                            <>
                                                                                {membersFetching ? (
                                                                                    <CircularProgress
                                                                                        color="inherit"
                                                                                        size={
                                                                                            20
                                                                                        }
                                                                                    />
                                                                                ) : null}
                                                                                {
                                                                                    params
                                                                                        .InputProps
                                                                                        .endAdornment
                                                                                }
                                                                            </>
                                                                        ),
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                    value={null}
                                                />

                                                <Box
                                                    display="flex"
                                                    flexWrap="wrap"
                                                    gap={1}
                                                >
                                                    {value.map((id: string) => {
                                                        const user =
                                                            userOptions.find(
                                                                (u) =>
                                                                    u.id === id,
                                                            );
                                                        return (
                                                            <Chip
                                                                key={id}
                                                                label={
                                                                    user?.name ||
                                                                    'Selected User'
                                                                }
                                                                size="small"
                                                                color="primary"
                                                                onDelete={() =>
                                                                    onChange(
                                                                        value.filter(
                                                                            (
                                                                                v: string,
                                                                            ) =>
                                                                                v !==
                                                                                id,
                                                                        ),
                                                                    )
                                                                }
                                                                sx={{
                                                                    borderRadius: 1,
                                                                    fontWeight: 600,
                                                                }}
                                                            />
                                                        );
                                                    })}
                                                </Box>
                                            </Stack>
                                        )}
                                    />
                                </Grid>
                            )}

                            <Grid
                                size={{
                                    xs: 12,
                                    sm: 6,
                                    md: userFilter ? 2.5 : 5,
                                }}
                            >
                                <TextField
                                    {...register('startDate')}
                                    label="From"
                                    type="date"
                                    fullWidth
                                    slotProps={{ inputLabel: { shrink: true } }}
                                />
                            </Grid>
                            <Grid
                                size={{
                                    xs: 12,
                                    sm: 6,
                                    md: userFilter ? 2.5 : 5,
                                }}
                            >
                                <TextField
                                    {...register('endDate')}
                                    label="To"
                                    type="date"
                                    fullWidth
                                    error={!!errors.endDate}
                                    helperText={errors.endDate?.message}
                                    slotProps={{ inputLabel: { shrink: true } }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 2 }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    type="submit"
                                    disabled={isFetching}
                                    sx={{ height: 56, fontWeight: 'bold' }}
                                >
                                    {isFetching ? (
                                        <CircularProgress
                                            size={24}
                                            color="inherit"
                                        />
                                    ) : (
                                        'Filter'
                                    )}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>

                    {data ? (
                        <>
                            <Grid container spacing={8}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Paper sx={{ p: 4 }}>
                                        <DonutCard
                                            title="Tickets by Status"
                                            chartData={data.statusData}
                                            total={data.totalStatus}
                                            label="TICKETS"
                                        />
                                    </Paper>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Paper sx={{ p: 4 }}>
                                        <DonutCard
                                            title="Tickets by Priority"
                                            chartData={data.priorityData}
                                            total={data.totalPriority}
                                            label="TICKETS"
                                        />
                                    </Paper>
                                </Grid>
                                <Grid size={{ xs: 12, md: 12 }}>
                                    <Paper sx={{ p: 4 }}>
                                        <StackedBarCard
                                            title="Efficiency: Success vs. Failure"
                                            data={data.successFailureData}
                                            dataKeys={priorityKeys}
                                            colors={data.priorityColors}
                                        />
                                    </Paper>
                                </Grid>
                                <Grid size={{ xs: 12, md: 12 }}>
                                    <Paper sx={{ p: 4 }}>
                                        <StackedBarCard
                                            title="Timeline: Deadline Trends"
                                            data={data.deadlineData}
                                            dataKeys={priorityKeys}
                                            colors={data.priorityColors}
                                        />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </>
                    ) : (
                        <Box>No report to show</Box>
                    )}
                </Stack>
            )}
        </Paper>
    );
};
