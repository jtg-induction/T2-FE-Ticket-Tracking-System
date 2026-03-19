import { ReactNode } from 'react';

import { ProjectMember, UserResponse } from '@type/user.types';

export type UserDetailProps = {
    label: string;
    user: UserResponse | ProjectMember | null;
    icon: ReactNode;
};
