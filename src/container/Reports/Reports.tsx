import { useState } from 'react';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Form } from 'react-router';

import {
    Autocomplete,
    Box,
    Button,
    Chip,
    CircularProgress,
    Grid2 as Grid,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { DonutCard, StackedBarCard } from '@component';
import { ErrorSnackbar } from '@component';
import { useDebounce, useReport } from '@hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { FilterFormValues, filterSchema } from '@schema';
import { useGetProjectMembersQuery } from '@service';
import { ErrorResponse } from '@type/standard.types';

import { ReportsProps } from './reports.types';

export const Reports = ({ userFilter, projectId, userId }: ReportsProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [apiError, setApiError] = useState<ErrorResponse | null>(null);
    const debouncedSearch = useDebounce(searchTerm, 500);

    const [submittedFilters, setSubmittedFilters] = useState<FilterFormValues>({
        userIds: [],
        startDate: '',
        endDate: '',
    });

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FilterFormValues>({
        resolver: zodResolver(filterSchema),
        defaultValues: { userIds: [], startDate: '', endDate: '' },
    });

    const { data: membersResponse } = useGetProjectMembersQuery(
        { id: projectId!, page: 1, search: debouncedSearch },
        { skip: !projectId || !userFilter },
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

    const onFilterSubmit: SubmitHandler<FilterFormValues> = (values) => {
        setSubmittedFilters(values);
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
        <Stack spacing={4} p={4}>
            <ErrorSnackbar error={apiError} onClose={handleCloseError} />
            <Typography variant="h5" fontWeight="bold">
                Project Insights
            </Typography>

            <Form
                onSubmit={() => {
                    void handleSubmit(onFilterSubmit);
                }}
            >
                <Grid container spacing={2}>
                    {userFilter && (
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Controller
                                name="userIds"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Stack spacing={2}>
                                        <Autocomplete
                                            options={userOptions}
                                            getOptionLabel={(option) =>
                                                option.name
                                            }
                                            inputValue={searchTerm}
                                            onInputChange={(_, newInputValue) =>
                                                setSearchTerm(newInputValue)
                                            }
                                            onChange={(_, newValue) => {
                                                if (
                                                    newValue &&
                                                    !value.includes(newValue.id)
                                                ) {
                                                    onChange([
                                                        ...value,
                                                        newValue.id,
                                                    ]);
                                                    setSearchTerm('');
                                                }
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Search and Add Users"
                                                    placeholder="Type to search..."
                                                />
                                            )}
                                            value={null}
                                            blurOnSelect
                                        />

                                        <Box
                                            display="flex"
                                            flexWrap="wrap"
                                            gap={1}
                                        >
                                            {value.map((id: string) => {
                                                const user = userOptions.find(
                                                    (u) => u.id === id,
                                                );
                                                return (
                                                    <Chip
                                                        key={id}
                                                        label={
                                                            user?.name ||
                                                            'Unknown User'
                                                        }
                                                        color="primary"
                                                        variant="outlined"
                                                        onDelete={() => {
                                                            onChange(
                                                                value.filter(
                                                                    (
                                                                        val: string,
                                                                    ) =>
                                                                        val !==
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

                    <Grid size={{ xs: 12, sm: 6, md: userFilter ? 2.5 : 5 }}>
                        <TextField
                            {...register('startDate')}
                            label="From"
                            type="date"
                            fullWidth
                            slotProps={{ inputLabel: { shrink: true } }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: userFilter ? 2.5 : 5 }}>
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
                            Filter
                        </Button>
                    </Grid>
                </Grid>
            </Form>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <DonutCard
                        title="Tickets by Status"
                        chartData={data.statusData}
                        total={data.totalStatus}
                        label="TICKETS"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <DonutCard
                        title="Tickets by Priority"
                        chartData={data.priorityData}
                        total={data.totalPriority}
                        label="TICKETS"
                    />
                </Grid>
                <Grid size={12}>
                    <StackedBarCard
                        title="Efficiency: Success vs. Failure"
                        data={data.successFailureData}
                        dataKeys={priorityKeys}
                        colors={data.priorityColors}
                    />
                </Grid>
                <Grid size={12}>
                    <StackedBarCard
                        title="Timeline: Deadline Trends"
                        data={data.deadlineData}
                        dataKeys={priorityKeys}
                        colors={data.priorityColors}
                    />
                </Grid>
            </Grid>
        </Stack>
    );
};
