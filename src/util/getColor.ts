import { ChipProps, Theme } from '@mui/material';

import { TicketPriority, TicketStatus } from '@type';

/**
 * Returns MUI Chip props based on ticket status.
 */
export const getStatusColor = (
    status: TicketStatus,
): Pick<ChipProps, 'color' | 'variant'> => {
    switch (status) {
        case TicketStatus.ToDo:
            return { color: 'error', variant: 'outlined' as const };
        case TicketStatus.InProgress:
            return { color: 'warning', variant: 'filled' as const };
        case TicketStatus.Done:
            return { color: 'success', variant: 'filled' as const };
        case TicketStatus.Closed:
            return { color: 'primary', variant: 'filled' as const };
        default:
            return { color: 'default', variant: 'outlined' as const };
    }
};

/**
 * Maps ticket priority to a theme-defined color.
 */
export const getPriorityColor = (priority: TicketPriority, theme: Theme) => {
    switch (priority) {
        case TicketPriority.Highest:
            return theme.palette.error.dark;
        case TicketPriority.High:
            return theme.palette.error.light;
        case TicketPriority.Medium:
            return theme.palette.warning.dark;
        case TicketPriority.Low:
            return theme.palette.warning.main;
        case TicketPriority.Lowest:
            return theme.palette.success.main;
        default:
            return theme.palette.grey[500];
    }
};
