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
};
