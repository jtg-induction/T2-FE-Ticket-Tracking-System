import '@tiptap/core';

/**
 * MODULE AUGMENTATION: Tiptap Markdown Extension
 * * WHY: Provides type-safety for the 'tiptap-markdown' extension which
 * injects the 'markdown' object into Editor storage at runtime.
 */
declare module '@tiptap/core' {
    interface Storage {
        markdown: {
            getMarkdown(): string;
        };
    }
    export interface Editor {
        storage: Storage;
    }
}
