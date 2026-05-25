import { ReactNode } from 'react';

/**
 * Props for the DashboardLayout component.
 * Defines the main content area and an optional sidebar slot.
 */
export type DashboardLayoutProps = {
    /** The primary content displayed in the center of the screen. */
    main: ReactNode;

    /** An optional panel displayed to the right of the main content. */
    sidebar?: ReactNode;
};
