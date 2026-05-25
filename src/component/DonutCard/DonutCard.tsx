import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { Box, Stack, Typography, useTheme } from '@mui/material';

import { DonutCardProps } from './DonutCard.types';
export const DonutCard = ({
    title,
    chartData,
    total,
    label,
}: DonutCardProps) => {
    const { zIndex } = useTheme();
    return (
        <Box>
            <Typography variant="h6" mb={2} fontWeight={600} textAlign="center">
                {title}
            </Typography>

            <Box width="100%" height={250} position="relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                            nameKey="name"
                            stroke="none"
                        />
                        <Tooltip
                            wrapperStyle={{ zIndex: zIndex.tooltip }}
                            contentStyle={{ borderRadius: 8 }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    textAlign="center"
                    style={{
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'none',
                    }}
                >
                    <Typography variant="h4" fontWeight="bold" lineHeight={1}>
                        {total}
                    </Typography>
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        fontWeight={700}
                        style={{ display: 'block', textTransform: 'uppercase' }}
                    >
                        {label}
                    </Typography>
                </Box>
            </Box>

            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
                gap={2}
                mt={3}
            >
                {chartData.map((item) => (
                    <Stack
                        key={item.name}
                        direction="row"
                        alignItems="center"
                        spacing={1}
                    >
                        <Box
                            width={10}
                            height={10}
                            borderRadius="50%"
                            bgcolor={item.fill}
                        />
                        <Typography
                            variant="caption"
                            fontWeight={700}
                            color="textSecondary"
                            style={{
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                            }}
                        >
                            {item.name}
                        </Typography>
                    </Stack>
                ))}
            </Stack>
        </Box>
    );
};
