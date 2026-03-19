import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { Box, Typography, useTheme } from '@mui/material';

import type { StackedBarCardProps } from './StackedBarCard.types';

export const StackedBarCard = ({
    title,
    data,
    dataKeys,
    colors,
}: StackedBarCardProps) => {
    const { palette, zIndex } = useTheme();
    return (
        <Box>
            <Typography variant="h6" mb={3} fontWeight={600}>
                {title}
            </Typography>

            <Box width="100%" height={400}>
                <ResponsiveContainer>
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke={palette.grey[500]}
                        />
                        <XAxis
                            dataKey="label"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                            cursor={{ fill: palette.grey[200] }}
                            wrapperStyle={{ zIndex: zIndex.tooltip }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            align="right"
                            iconType="circle"
                        />
                        {dataKeys.map((key, index) => (
                            <Bar
                                key={key}
                                dataKey={key}
                                stackId="a"
                                fill={colors[key]}
                                radius={
                                    index === dataKeys.length - 1
                                        ? [8, 8, 0, 0]
                                        : [0, 0, 0, 0]
                                }
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};
