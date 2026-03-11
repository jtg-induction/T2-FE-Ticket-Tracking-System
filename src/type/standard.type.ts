/**
 * A dictionary of field-specific validation errors.
 * Key: The field name (e.g., 'email').
 * Value: An array of error messages for that field.
 */
export type FieldErrors = Record<string, string[]>;

/**
 * Metadata for paginated list results.
 */
export interface PaginationMetadata {
    /** Total number of items in the database */
    count: number;
    /** URL for the next page */
    next: string | null;
    /** URL for the previous page */
    previous: string | null;
}

/**
 * Standard API success responses for paginated data.
 * @template T The type of the individual data items.
 */
export interface PaginatedResponse<T> {
    success: true;
    /** Array of result items */
    data: T[];
    /** Pagination details */
    meta: PaginationMetadata;
    /** Optional success message */
    message?: string;
}

/**
 * Standard API success responses for entity data.
 * @template T The type of the data object.
 */
export interface EntityResponse<T> {
    success: true;
    /** The requested data object */
    data: T;
    /** Optional success message */
    message?: string;
}

/**
 * Standard API error response.
 */
export interface ErrorResponse {
    success: false;
    /** User-friendly error summary */
    message: string;
    /** Validation errors in key value pair */
    errors?: FieldErrors;
    /** Internal error code for debugging */
    code?: string;
}
