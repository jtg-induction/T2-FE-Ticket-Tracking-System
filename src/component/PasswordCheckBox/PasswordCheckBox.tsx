import { Circle, Done } from '@mui/icons-material';
import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';

export const PasswordCheckBox = ({ password = '' }: { password?: string }) => {
    const { palette } = useTheme();

    const criteria = [
        { label: '8+ characters', valid: password.length >= 8 },
        { label: 'Number', valid: /[0-9]/.test(password) },
        { label: 'Uppercase letter', valid: /[A-Z]/.test(password) },
        { label: 'Special character', valid: /[^A-Za-z0-9]/.test(password) },
    ];

    const passedCount = criteria.filter((c) => c.valid).length;
    const hasInput = password.length > 0;
    const barsToHighlight = hasInput ? passedCount + 1 : 0;

    const getStrengthColor = () => {
        if (!hasInput) return palette.action.focus;

        switch (passedCount) {
            case 0:
                return palette.error.dark;
            case 1:
                return palette.error.light;
            case 2:
                return palette.warning.main;
            case 3:
                return palette.success.light;
            case 4:
                return palette.success.main;
            default:
                return palette.success.main;
        }
    };

    const activeColor = getStrengthColor();

    return (
        <Box>
            <Stack direction="row" gap={1} mb={2}>
                {[1, 2, 3, 4, 5].map((step) => (
                    <Box
                        key={step}
                        height={6}
                        flex={1}
                        borderRadius={1}
                        bgcolor={
                            step <= barsToHighlight
                                ? activeColor
                                : palette.action.focus
                        }
                    />
                ))}
            </Stack>

            <Typography
                variant="caption"
                fontWeight={700}
                color="textSecondary"
                mb={1}
                letterSpacing={1}
            >
                PASSWORD MUST INCLUDE
            </Typography>

            <List disablePadding>
                {criteria.map((item, index) => {
                    const isSuccess = item.valid;
                    const isError = hasInput && !isSuccess;

                    return (
                        <ListItem key={index} disablePadding>
                            <ListItemIcon sx={{ minWidth: 20 }}>
                                {isSuccess ? (
                                    <Done
                                        color="success"
                                        sx={{ fontSize: '1.5rem' }}
                                    />
                                ) : (
                                    <Circle
                                        sx={{
                                            fontSize: '.8rem',
                                            color: isError
                                                ? 'error.main'
                                                : 'action.disabled',
                                        }}
                                    />
                                )}
                            </ListItemIcon>
                            <Typography
                                variant="caption"
                                fontWeight={isSuccess ? 600 : 400}
                                color={
                                    isSuccess
                                        ? 'success.main'
                                        : isError
                                          ? 'error.main'
                                          : 'text.secondary'
                                }
                            >
                                {item.label}
                            </Typography>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
};
