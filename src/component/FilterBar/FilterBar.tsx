import { useEffect, useState } from 'react';

import { Clear, Search } from '@mui/icons-material';
import {
    Box,
    Button,
    Collapse,
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    Stack,
    TextField,
} from '@mui/material';

import {
    EMPTY_FILTERS,
    STATUS_OPTIONS,
    TICKET_PRIORITY_OPTIONS,
} from '@constant';
import { TicketFilters } from '@type';

import { FilterBarProps } from './FilterBar.types';

export const FilterBar = ({
    open,
    committedFilters,
    onApply,
    onClear,
    activeFilterCount,
}: FilterBarProps) => {
    const [pending, setPending] = useState<TicketFilters>(committedFilters);

    useEffect(() => {
        if (open) setPending(committedFilters);
    }, [open, committedFilters]);

    const setField = (key: keyof TicketFilters) => (value: string) =>
        setPending((prev) => ({ ...prev, [key]: value }));

    const handleClear = () => {
        setPending(EMPTY_FILTERS);
        onClear();
    };

    return (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Box px={3} py={2}>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <TextField
                        size="small"
                        placeholder="Search by title or key…"
                        value={pending.search}
                        onChange={(e) => setField('search')(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && onApply(pending)}
                        sx={{ minWidth: 220 }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search fontSize="small" />
                                    </InputAdornment>
                                ),
                                endAdornment: pending.search ? (
                                    <InputAdornment position="end">
                                        <IconButton
                                            size="small"
                                            onClick={() =>
                                                setField('search')('')
                                            }
                                        >
                                            <Clear fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                ) : null,
                            },
                        }}
                    />

                    <Select
                        size="small"
                        displayEmpty
                        value={pending.status}
                        onChange={(e) => setField('status')(e.target.value)}
                        renderValue={(v) => v || 'All Statuses'}
                        sx={{ minWidth: 140 }}
                    >
                        <MenuItem value="">All Statuses</MenuItem>
                        {STATUS_OPTIONS.map((s) => (
                            <MenuItem key={s} value={s}>
                                {s}
                            </MenuItem>
                        ))}
                    </Select>

                    <Select
                        size="small"
                        displayEmpty
                        value={pending.priority}
                        onChange={(e) => setField('priority')(e.target.value)}
                        renderValue={(v) => v || 'All Priorities'}
                        sx={{ minWidth: 140 }}
                    >
                        <MenuItem value="">All Priorities</MenuItem>
                        {TICKET_PRIORITY_OPTIONS.map((p) => (
                            <MenuItem key={p} value={p}>
                                {p}
                            </MenuItem>
                        ))}
                    </Select>

                    <Stack direction="row" gap={1} ml="auto">
                        {activeFilterCount > 0 && (
                            <Button
                                size="small"
                                variant="text"
                                color="inherit"
                                startIcon={<Clear />}
                                onClick={handleClear}
                            >
                                Clear all
                            </Button>
                        )}
                        <Button
                            size="small"
                            variant="contained"
                            disableElevation
                            onClick={() => onApply(pending)}
                        >
                            Apply Filters
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Collapse>
    );
};
