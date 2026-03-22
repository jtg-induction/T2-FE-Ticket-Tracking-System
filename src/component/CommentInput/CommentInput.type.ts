export type CommentInputProps = {
    // We use unknown because the UI only cares if it finishes, not what it returns
    onSubmit: (message: string) => Promise<unknown>;
    isSubmitting: boolean;
};
