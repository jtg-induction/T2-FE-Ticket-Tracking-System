import { ErrorResponse } from '@type';

export type ErrorSnackbarProps = {
    error: ErrorResponse | null;
    onClose: () => void;
    autoHideDuration?: number;
};
