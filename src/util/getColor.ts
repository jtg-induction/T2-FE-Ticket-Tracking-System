import { ChipProps, Theme } from '@mui/material';

import { TicketPriority, TicketStatus } from '@constant';

/**
 * Returns MUI Chip props based on ticket status.
 */
export const getStatusColor = (
    status: TicketStatus,
): Pick<ChipProps, 'color' | 'variant'> => {
    switch (status) {
        case TicketStatus.ToDo:
            return { color: 'default', variant: 'filled' as const };
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
            return theme.palette.warning.main;
        case TicketPriority.Low:
            return theme.palette.success.main;
        case TicketPriority.Lowest:
            return theme.palette.success.dark;
        default:
            return theme.palette.text.disabled;
    }
};

/**
 * Converts a string into a consistent hex color.
 * @param string - The unique string (e.g. email or username) to hash.
 */
export const stringToColor = (string: string): string => {
    if (!string.trim()) return `hsl(0, 0%, 70%)`;

    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    const h = Math.abs(hash) % 180;
    const s = 55 + (Math.abs(hash >> 8) % 30);
    const l = 40 + (Math.abs(hash >> 16) % 15);

    return `hsl(${h}, ${s}%, ${l}%)`;
};
