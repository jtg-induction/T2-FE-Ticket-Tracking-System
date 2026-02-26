export type UserRole = 'owner' | 'admin' | 'member';

export type UserCardProps = {
    userId: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    myRole: string;
    onAction: (action: string, userId: string) => void;
};

export const ROLE_HIERARCHY: Record<string, number> = {
    owner: 3,
    admin: 2,
    member: 1,
};
