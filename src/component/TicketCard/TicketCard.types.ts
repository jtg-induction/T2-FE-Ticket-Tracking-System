import { Ticket } from '@type/ticket.types';

export type TicketCardProps = {
    ticket: Ticket;
    onClick: () => void;
    onAvatarClick: () => void;
};
