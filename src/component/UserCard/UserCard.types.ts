import { ProjectRole } from '@type/project.types';

export type UserCardProps = {
    userId: string;
    firstName: string;
    lastName: string;
    role: ProjectRole;
    myRole: string;
    onAction: (action: string, userId: string) => void;
};

export const ROLE_HIERARCHY: Record<string, number> = {
    owner: 3,
    admin: 2,
    member: 1,
};
