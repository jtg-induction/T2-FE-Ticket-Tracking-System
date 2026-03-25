import { APP_NAME } from '@constant';
import { useEffect } from 'react';

export const useDocumentTitle = (pageTitle: string) => {
    useEffect(() => {
        const fullTitle = pageTitle ? `${pageTitle} | ${APP_NAME}` : APP_NAME;
        document.title = fullTitle;
    }, [pageTitle]);
};
