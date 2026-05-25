/**
 * Props for the CommentInput component.
 */
export type CommentInputProps = {
    /** * Function called when a comment is submitted.
     * Returns a promise to allow the UI to track completion.
     */
    // We use unknown because the UI only cares if it finishes, not what it returns
    onSubmit: (message: string) => Promise<unknown>;

    /** Indicates if a submission is currently in progress. */
    isSubmitting: boolean;
};
