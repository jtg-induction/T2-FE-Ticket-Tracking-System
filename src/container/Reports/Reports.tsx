import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { ArrowBack, Download as DownloadIcon } from '@mui/icons-material';
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
    ErrorSnackbar,
    HighlightTextMatch,
    StackedBarCard,
} from '@component';
import { useDebounce, useReport } from '@hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { FilterFormValues, filterSchema } from '@schema';
import {
    useGetProjectMembersQuery,
    useLazyDownloadTicketReportQuery,
} from '@service';
import { ErrorResponse } from '@type/standard.types';

import { ReportsProps } from './reports.types';

export const Reports = ({ userFilter, projectId, userId }: ReportsProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [apiError, setApiError] = useState<ErrorResponse | null>(null);
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

    const { data: membersResponse } = useGetProjectMembersQuery(
        { id: projectId!, page: 1, search: debouncedSearch },
        {
            skip:
                !projectId || !userFilter || debouncedSearch.trim().length <= 1,
        },
    );

    const userOptions =
        membersResponse?.data?.map((m) => ({
            id: m.user_id,
            name: `${m.first_name} ${m.last_name}`,
        })) || [];

    const { data, loading, priorityKeys } = useReport(
        projectId,
        userId,
        submittedFilters,
    );

    const handleCloseError = () => setApiError(null);

    const onFilterSubmit = (values: FilterFormValues) => {
        setSubmittedFilters(values);
    };

    const [triggerDownload, { isFetching: isDownloading }] =
        useLazyDownloadTicketReportQuery();

    const handleDownload = () => {
        const values = getValues();
        void triggerDownload({
            projectId,
            userId,
            userIds: values.userIds,
            startDate: values.startDate,
            endDate: values.endDate,
        });
    };

    if (loading || !data) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Paper>
            <Stack spacing={4} p={4}>
                <ErrorSnackbar error={apiError} onClose={handleCloseError} />
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Stack direction="row" alignItems="center" gap={2}>
                        <CustomIconButton
                            variant="standard"
                            onClick={() => void navigate(-1)}
                        >
                            <ArrowBack />
                        </CustomIconButton>
                        <Typography variant="h4" fontWeight="bold">
                            Insights
                        </Typography>
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
                        onClick={handleDownload}
                        disabled={isDownloading}
                        sx={{ fontWeight: 'bold' }}
                    >
                        {isDownloading ? 'Exporting...' : 'Export PDF'}
                    </Button>
                </Stack>

                <Box component="form" onSubmit={handleSubmit(onFilterSubmit)}>
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
                                                options={userOptions}
                                                // getOptionLabel MUST return a string
                                                getOptionLabel={(option) =>
                                                    option.name
                                                }
                                                inputValue={searchTerm}
                                                onInputChange={(_, newVal) =>
                                                    setSearchTerm(newVal)
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
                                                            key={key}
                                                            {...optionProps}
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems:
                                                                    'center',
                                                                gap: 0.5,
                                                            }}
                                                        >
                                                            {HighlightTextMatch(
                                                                option.name,
                                                                searchTerm,
                                                            )}
                                                        </Box>
                                                    );
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Search and Add Users"
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
                                                            (u) => u.id === id,
                                                        );
                                                    return (
                                                        <Chip
                                                            key={id}
                                                            label={
                                                                user?.name ||
                                                                'Unknown'
                                                            }
                                                            onDelete={() => {
                                                                onChange(
                                                                    value.filter(
                                                                        (
                                                                            v: string,
                                                                        ) =>
                                                                            v !==
                                                                            id,
                                                                    ),
                                                                );
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
                            size={{ xs: 12, sm: 6, md: userFilter ? 2.5 : 5 }}
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
                            size={{ xs: 12, sm: 6, md: userFilter ? 2.5 : 5 }}
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
                                sx={{ height: 56, fontWeight: 'bold' }}
                            >
                                {loading ? 'Loading..' : 'Filter'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

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
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper sx={{ p: 4 }}>
                            <StackedBarCard
                                title="Efficiency: Success vs. Failure"
                                data={data.successFailureData}
                                dataKeys={priorityKeys}
                                colors={data.priorityColors}
                            />
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
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
            </Stack>
        </Paper>
    );
};
