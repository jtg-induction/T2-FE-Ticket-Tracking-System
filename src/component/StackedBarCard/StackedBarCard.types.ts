/**
 * Properties for the StackedBarCard component.
 * Configures the title, datasets, and visual mapping for stacked bar visualizations.
 */
export type StackedBarCardProps = {
    /** The title displayed at the top of the chart card */
    title: string;
    /** The collection of data points to be rendered in the chart */
    data: StackedBarDataItem[];
    /** The specific object keys from the data items to be stacked as bars */
    dataKeys: string[];
    /** Mapping of data keys to their respective hexadecimal color strings */
    colors: Record<string, string>;
};

/**
 * Represents a single row of data for a stacked bar chart.
 * Contains a required label and dynamic numeric or string values for stacking.
 */
export type StackedBarDataItem = {
    /** The identifier for the X-Axis */
    label: string;
    /** Dynamic values corresponding to the dataKeys used for stacking */
    [key: string]: string | number;
};
