export type RichTextEditorProps = {
    value: string;
    onChange: (markdown: string) => void;
    onBlur?: () => void;
    placeholder?: string;
};
