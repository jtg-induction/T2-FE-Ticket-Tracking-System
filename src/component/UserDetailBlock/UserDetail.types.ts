import { ReactNode } from 'react';

import { ProjectMember, UserResponse } from '@type/user.types';

/**
 * Props for the UserDetail component.
 */
export type UserDetailProps = {
    /** The descriptive text for the detail field (e.g., "Reporter"). */
    label: string;

    /** The user object to display. Supports multiple user types or a null state. */
    user: UserResponse | ProjectMember | null;

    /** The graphical icon representing the specific detail field. */
    icon: ReactNode;
};
