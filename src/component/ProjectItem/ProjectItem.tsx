import { Box, Card, CardContent, Divider, Typography } from '@mui/material';

import { convertIsoToDateYear } from '@util';

import { ProjectItemProps } from './ProjectItem.types';

export const ProjectItem = ({
    name,
    description,
    lastUpdated,
    onClick,
}: ProjectItemProps) => (
    <Card onClick={onClick} variant="outlined" tabIndex={0}>
        <CardContent>
            <Box>
                <Typography
                    variant="h6"
                    component="div"
                    color="primary.main"
                    fontWeight="600"
                >
                    {name}
                </Typography>
                <Typography variant="caption" color="text.disabled">
                    Updated: {convertIsoToDateYear(lastUpdated ?? '')}
                </Typography>
            </Box>

            {description && (
                <>
                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </>
            )}
        </CardContent>
    </Card>
);
