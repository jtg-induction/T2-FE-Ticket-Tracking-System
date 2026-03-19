import { Theme } from '@mui/material';

import { TicketPriority, TicketStatus } from '@type';

export const getGraphColors = ({ palette }: Theme) =>
    ({
        priority: {
            [TicketPriority.Highest]: palette.error.dark,
            [TicketPriority.High]: palette.error.light,
            [TicketPriority.Medium]: palette.warning.dark,
            [TicketPriority.Low]: palette.warning.main,
            [TicketPriority.Lowest]: palette.success.main,
        },
        status: {
            [TicketStatus.ToDo]: palette.error.main,
            [TicketStatus.InProgress]: palette.warning.main,
            [TicketStatus.Done]: palette.success.main,
            [TicketStatus.Closed]: palette.info.main,
        },
        chart: {
            grid: palette.divider,
            tooltipBackground: palette.background.paper,
            cursorFill: palette.action.hover,
        },
    }) as const;

export const PRIORITY_STACK_KEYS = [
    TicketPriority.Lowest,
    TicketPriority.Low,
    TicketPriority.Medium,
    TicketPriority.High,
    TicketPriority.Highest,
];
