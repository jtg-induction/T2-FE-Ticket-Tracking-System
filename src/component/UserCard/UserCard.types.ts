import { MouseEvent } from 'react';
import { ProjectRole } from '@type/project.types';

/**
 * Props for the UserCard component.
 * All business logic is computed by the parent container — this component only renders.
 */
export type UserCardProps = {
    userId: string;
    firstName: string;
    lastName: string;
    role: ProjectRole;
    /** Whether the action menu (is visible for this card. */
    showMenu: boolean;
    canMakeOwner: boolean;
    canMakeAdmin: boolean;
    canRevokeAdmin: boolean;
    /** The DOM element the menu is anchored to. */
    anchorEl: HTMLElement | null;
    onCardClick: () => void;
    onMenuOpen: (event: MouseEvent<HTMLElement>) => void;
    onMenuClose: (event: MouseEvent<HTMLElement>) => void;
    /** Called when a menu action is selected for particular user. */
    onActionClick: (action: UserAction, userId: string) => void;
};

/**
 * Actions that can be performed on a project member.
 */
export enum UserAction {
    MakeOwner = 'make_owner',
    MakeAdmin = 'make_admin',
    RevokeAdmin = 'revoke_admin',
    RemoveUser = 'remove_user',
}

/**
 * Numeric rank for each role used to compare authority levels.
 * Higher value means more authority.
 */
export const ROLE_HIERARCHY: Record<ProjectRole, number> = {
    [ProjectRole.Owner]: 3,
    [ProjectRole.Admin]: 2,
    [ProjectRole.Member]: 1,
};
