import { Box, Card, CardContent, Divider, Typography } from '@mui/material';

import { ProjectItemProps } from './ProjectItem.types';

export const ProjectItem = (props: ProjectItemProps) => {
    const { name, description, lastUpdated, onClick } = props;
    return (
        <Card
            onClick={onClick}
            variant="outlined"
            sx={{
                mb: 2,
                borderRadius: 2,
                '&:hover': { boxShadow: 1 },
            }}
        >
            <CardContent>
                <Box sx={{ mb: 1 }}>
                    <Typography
                        variant="h6"
                        component="div"
                        color="primary.main"
                        fontWeight="600"
                    >
                        {name}
                    </Typography>
                    <Typography
                        variant="caption"
                        color="text.disabled"
                        sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
                    >
                        Updated: {lastUpdated}
                    </Typography>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};
