/**
 * Represents a single segment in a Donut or Pie chart.
 * Maps a category name to its quantitative value and visual color.
 */
export type DonutChartDataItem = {
    /** The label for the data segment */
    name: string;
    /** The numerical value of the segment */
    value: number;
    /** The hexadecimal or CSS color string for the segment fill */
    fill: string;
};

/**
 * Properties for the DonutCard component.
 * Configures the visualization of categorical data with a central summary total.
 */
export type DonutCardProps = {
    /** The title displayed at the top of the card */
    title: string;
    /** The array of data points to be rendered in the donut chart */
    chartData: DonutChartDataItem[];
    /** The aggregate sum displayed in the center of the donut */
    total: number;
    /** The descriptive label for the total value */
    label: string;
};
