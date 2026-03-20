import { ProjectRole } from '@type/project.types';

export type UserCardProps = {
    userId: string;
    firstName: string;
    lastName: string;
    role: ProjectRole;
    showMenu: boolean;
    canMakeOwner: boolean;
    canMakeAdmin: boolean;
    canRevokeAdmin: boolean;
    onAction: (action: UserAction, userId: string) => void;
};

export enum UserAction {
    MakeOwner = 'make_owner',
    MakeAdmin = 'make_admin',
    RevokeAdmin = 'revoke_admin',
    RemoveUser = 'remove_user',
}

export const ROLE_HIERARCHY: Record<ProjectRole, number> = {
    [ProjectRole.Owner]: 3,
    [ProjectRole.Admin]: 2,
    [ProjectRole.Member]: 1,
};
