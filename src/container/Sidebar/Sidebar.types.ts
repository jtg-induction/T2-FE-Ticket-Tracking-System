/**
 * Side props, Handles sidebar state
 */
export type SidebarProps = {
    /**
     * Depicts drawer state
     */
    open: boolean;
    /**
     * handles drawer state
     */
    onClose: () => void;
};
