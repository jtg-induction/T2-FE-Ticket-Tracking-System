import { Link } from 'react-router';

import { LinkOutlined } from '@mui/icons-material';
import {
    Card,
    CardContent,
    Chip,
    Divider,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';

import { ProjectItemProps } from './ProjectItem.types';

export const ProjectItem = ({ project, onClick }: ProjectItemProps) => (
    <Card onClick={onClick} variant="outlined" tabIndex={0}>
        <CardContent>
            <Stack direction="row" alignItems="center" gap={1}>
                <Chip
                    title={project.jira_project_key}
                    label={project.jira_project_key}
                    size="small"
                    color="primary"
                    sx={{ fontWeight: 800, borderRadius: 2 }}
                />
                /
                <Typography
                    title={project.title}
                    variant="h6"
                    fontWeight="600"
                    sx={{ flex: 1, minWidth: 0 }}
                >
                    {project.title}
                </Typography>
                {project.site_url && (
                    <Link
                        to={project.site_url}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        color="text.secondary"
                    >
                        <Tooltip title={`Jira site: ${project.site_url}`}>
                            <LinkOutlined sx={{ color: 'text.disabled' }} />
                        </Tooltip>
                    </Link>
                )}
            </Stack>

            {project.description && (
                <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2" color="text.secondary">
                        Description: {project.description}
                    </Typography>
                </>
            )}
        </CardContent>
    </Card>
);
