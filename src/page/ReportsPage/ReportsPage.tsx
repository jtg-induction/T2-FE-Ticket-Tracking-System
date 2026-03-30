import { useLocation, useParams } from 'react-router';

import { PATHS } from '@constant';
import { Reports } from '@container';

export const ReportsPage = () => {
    const { projectId, userId, id } = useParams();
    const { pathname } = useLocation();

    const isProjectContext = pathname.includes(PATHS.PROJECTS);
    const effectiveUserId = userId || id;

    return (
        <Reports
            projectId={isProjectContext ? projectId : undefined}
            userId={!isProjectContext ? effectiveUserId : undefined}
            userFilter={isProjectContext}
        />
    );
};
