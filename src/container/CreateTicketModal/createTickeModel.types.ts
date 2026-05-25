import { TicketStatus } from '@constant';

/**
 * Props for the CreateTicketModal component.
 */
export type CreateTicketModalProps = {
    /** Whether the modal is currently visible on the screen. */
    open: boolean;

    /** Function called to close the modal (clicking Cancel or the backdrop). */
    onClose: () => void;

    /** The ID of the project for which this ticket will be created. */
    projectId: string;

    /** Initial status for which the create ticket modal was targeted  */
    initialStatus: TicketStatus | null;
};
