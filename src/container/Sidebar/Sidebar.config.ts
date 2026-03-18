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
        id: 'mytickets',
        title: 'My Tickets',
        route: PATHS.TICKET,
        icon: AssignmentOutlined,
    },
];
