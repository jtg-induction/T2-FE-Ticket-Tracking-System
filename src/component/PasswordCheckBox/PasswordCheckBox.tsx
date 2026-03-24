import { Close, Done } from '@mui/icons-material';
import { Box, List, ListItem, ListItemIcon, Typography } from '@mui/material';

export const PasswordCheckBox = ({ password }: { password: string }) => (
    <Box sx={{ mt: 1 }}>
        <Typography variant="caption">Password must include:</Typography>
        <List disablePadding>
            {[
                { label: '8+ characters', valid: password.length > 7 },
                { label: 'Number', valid: /[0-9]/.test(password) },
                { label: 'Uppercase character', valid: /[A-Z]/.test(password) },
                {
                    label: 'Special Character',
                    valid: /[^A-Za-z0-9]/.test(password),
                },
            ].map((item, index) => (
                <ListItem key={index} disablePadding>
                    <ListItemIcon sx={{ minWidth: 24 }}>
                        {item.valid ? (
                            <Done color="success" sx={{ fontSize: '1.5rem' }} />
                        ) : (
                            <Close color="error" sx={{ fontSize: '1.5rem' }} />
                        )}
                    </ListItemIcon>
                    <Typography variant="caption">{item.label}</Typography>
                </ListItem>
            ))}
        </List>
    </Box>
);
