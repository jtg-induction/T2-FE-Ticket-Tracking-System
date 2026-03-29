import {
    Bar,
    BarChart,
    CartesianGrid,
    Label,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { Box, Stack, Typography, useTheme } from '@mui/material';

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
            <Box height={'100'} width={'100'} color={'black'}></Box>
            <Typography variant="h6" mb={3} fontWeight={600} textAlign="center">
                {title}
            </Typography>

            <Box width="100%" sx={{ height: { xs: 400, md: 600 } }}>
                <ResponsiveContainer>
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 10, left: 20, bottom: 0 }}
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
                            tick={{ fontSize: 16 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 16 }}
                        >
                            <Label
                                value="No. of Tickets"
                                angle={-90}
                                position="insideLeft"
                                style={{
                                    textAnchor: 'middle',
                                    fill: palette.text.secondary,
                                    fontWeight: 500,
                                    fontSize: 14,
                                }}
                            />
                        </YAxis>
                        <Tooltip
                            cursor={{ fill: palette.grey[200] }}
                            wrapperStyle={{ zIndex: zIndex.tooltip }}
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
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
                gap={3}
                mt={4}
            >
                {[...dataKeys].reverse().map((key) => (
                    <Stack
                        key={key}
                        direction="row"
                        alignItems="center"
                        spacing={1}
                    >
                        <Box
                            width={12}
                            height={12}
                            borderRadius="50%"
                            bgcolor={colors[key]}
                        />
                        <Typography
                            variant="caption"
                            fontWeight={700}
                            color="text.secondary"
                            sx={{
                                textTransform: 'uppercase',
                                letterSpacing: 0.5,
                            }}
                        >
                            {key}
                        </Typography>
                    </Stack>
                ))}
            </Stack>
        </Box>
    );
};
