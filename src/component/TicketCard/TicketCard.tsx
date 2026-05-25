import { Alarm } from '@mui/icons-material';
import { Box, Stack, Tooltip, Typography, useTheme } from '@mui/material';

import { convertIsoToDateYear, getPriorityColor, stringToColor } from '@util';

import {
    StyledPriorityBadge,
    StyledTicketAvatar,
    StyledTicketCard,
    StyledTicketCardContent,
    StyledTicketTitle,
} from './TicketCard.style';
import { TicketCardProps } from './TicketCard.types';

export const TicketCard = ({
    ticket,
    onClick,
    onAvatarClick,
}: TicketCardProps) => {
    const theme = useTheme();
    const priorityColor = getPriorityColor(ticket.priority, theme);

    return (
        <StyledTicketCard
            onClick={onClick}
            key={ticket.id}
            priorityColor={priorityColor}
        >
            <StyledPriorityBadge
                className="priority-badge"
                variant="caption"
                priorityColor={priorityColor}
                fontWeight={600}
            >
                Priority: {ticket.priority.toLowerCase()}
            </StyledPriorityBadge>
            <StyledTicketCardContent>
                <Box mb={1}>
                    <Typography
                        variant="caption"
                        fontWeight="bold"
                        color="primary"
                    >
                        {ticket.jira_id}
                    </Typography>
                    <Tooltip title={ticket.name}>
                        <StyledTicketTitle variant="body2" fontWeight={600}>
                            {ticket.name}
                        </StyledTicketTitle>
                    </Tooltip>
                    {ticket.deadline && (
                        <Tooltip
                            title={`Deadline: ${convertIsoToDateYear(ticket.deadline)}`}
                        >
                            <Stack direction="row" alignItems="center" gap={1}>
                                <Alarm
                                    color="warning"
                                    sx={{ fontSize: '1.5rem' }}
                                />
                                <Typography
                                    fontSize="1.2rem"
                                    fontWeight={600}
                                    color="warning"
                                >
                                    {convertIsoToDateYear(ticket.deadline)}
                                </Typography>
                            </Stack>
                        </Tooltip>
                    )}
                </Box>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="caption" color="text.secondary">
                        {ticket.category}
                    </Typography>
                    {ticket.assignee && (
                        <Tooltip
                            title={
                                ticket.assignee.first_name +
                                ' ' +
                                ticket.assignee.last_name
                            }
                        >
                            <StyledTicketAvatar
                                onClick={(e) => {
                                    e.stopPropagation();
                                    void onAvatarClick();
                                }}
                                sx={{
                                    bgcolor: stringToColor(
                                        ticket.assignee.email,
                                    ),
                                }}
                            >
                                {ticket.assignee.first_name?.[0]}
                                {ticket.assignee.last_name?.[0]}
                            </StyledTicketAvatar>
                        </Tooltip>
                    )}
                </Stack>
            </StyledTicketCardContent>
        </StyledTicketCard>
    );
};
