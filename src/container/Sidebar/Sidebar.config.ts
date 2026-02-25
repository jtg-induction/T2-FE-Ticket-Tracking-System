import { AssignmentOutlined, FolderOpenOutlined } from '@mui/icons-material';

import { PATHS } from '@constant';

export const SIDEBAR_CONFIG = [
    {
        id: 'projects',
        title: 'Projects',
        route: PATHS.PROJECTS,
        icon: FolderOpenOutlined,
    },
    {
        id: 'tasks',
        title: 'Tasks',
        route: PATHS.TASKS,
        icon: AssignmentOutlined,
    },
];
