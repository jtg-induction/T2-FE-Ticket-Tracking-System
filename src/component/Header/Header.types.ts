/**
 * Configuration props for the Header component.
 */
export type HeaderProps = {
    /** * The initials representing the logged-in user's name.
     * @example "JD"
     */
    userInitial: string;

    /** * Callback function triggered when the sidebar toggle button is clicked.
     */
    onSidebarToggle: () => void;
};
