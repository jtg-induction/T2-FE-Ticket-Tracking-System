import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { Box, Typography, useTheme } from '@mui/material';

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

            <Box width="100%" height={320} position="relative">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={75}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            nameKey="name"
                            stroke="none"
                        />
                        <Tooltip
                            wrapperStyle={{ zIndex: zIndex.tooltip }}
                            contentStyle={{ borderRadius: 8 }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                        />
                    </PieChart>
                </ResponsiveContainer>

                <Box
                    position="absolute"
                    top="42%"
                    left="50%"
                    textAlign="center"
                    style={{ transform: 'translate(-50%, -50%)' }}
                >
                    <Typography variant="h3" fontWeight="bold">
                        {total}
                    </Typography>
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        fontWeight={700}
                    >
                        {label}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};
