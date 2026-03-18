import { Markdown } from 'tiptap-markdown';

import {
    DeleteSweep,
    FormatBold,
    FormatItalic,
    FormatListBulleted,
    FormatListNumbered,
    FormatUnderlined,
    InsertLink,
    StrikethroughS,
} from '@mui/icons-material';
import { Box, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';

import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Underline } from '@tiptap/extension-underline';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { RichTextEditorProps } from './RichTextEditor.types';

export const RichTextEditor = ({
    value,
    onChange,
    onBlur,
    placeholder,
}: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure(),
            Underline,
            Link.configure({
                openOnClick: false,
                autolink: true,
            }),
            Markdown,
            Placeholder.configure({
                placeholder: placeholder ?? 'Write something...',
                showOnlyWhenEditable: false,
            }),
        ],
        content: value,
        onUpdate: ({ editor: updatedEditor }: { editor: Editor }) => {
            const markdown = (
                updatedEditor.storage.markdown as { getMarkdown: () => string }
            ).getMarkdown();
            onChange(updatedEditor.isEmpty ? '' : markdown);
        },
    });

    if (!editor) return null;

    const addLink = () => {
        const attributes = editor.getAttributes('link') as { href?: string };
        const previousUrl = attributes.href;

        let url = window.prompt('URL', previousUrl);

        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        if (url && !/^https?:\/\//i.test(url) && !url.startsWith('/')) {
            url = `https://${url}`;
        }

        editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: url })
            .run();
    };

    return (
        <Box
            border="1px solid"
            borderColor="divider"
            borderRadius={2}
            sx={{
                '& .ProseMirror': {
                    outline: 'none',
                    minHeight: '8rem',
                    px: 2,
                    '& p.is-editor-empty:first-of-type::before': {
                        content: 'attr(data-placeholder)',
                        color: 'text.disabled',
                        float: 'left',
                        height: 0,
                        pointerEvents: 'none',
                    },
                },
            }}
        >
            <Stack
                direction="row"
                spacing={1}
                p={1}
                borderBottom="1px solid"
                borderColor="divider"
                flexWrap="wrap"
                useFlexGap
            >
                <ToggleButtonGroup size="small">
                    <ToggleButton
                        value="bold"
                        selected={editor.isActive('bold')}
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                    >
                        <FormatBold fontSize="small" />
                    </ToggleButton>
                    <ToggleButton
                        value="italic"
                        selected={editor.isActive('italic')}
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                    >
                        <FormatItalic fontSize="small" />
                    </ToggleButton>
                    <ToggleButton
                        value="underline"
                        selected={editor.isActive('underline')}
                        onClick={() =>
                            editor.chain().focus().toggleUnderline().run()
                        }
                    >
                        <FormatUnderlined fontSize="small" />
                    </ToggleButton>
                    <ToggleButton
                        value="strike"
                        selected={editor.isActive('strike')}
                        onClick={() =>
                            editor.chain().focus().toggleStrike().run()
                        }
                    >
                        <StrikethroughS fontSize="small" />
                    </ToggleButton>
                </ToggleButtonGroup>

                <ToggleButtonGroup size="small">
                    <ToggleButton
                        value="bulletList"
                        selected={editor.isActive('bulletList')}
                        onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                        }
                    >
                        <FormatListBulleted fontSize="small" />
                    </ToggleButton>
                    <ToggleButton
                        value="orderedList"
                        selected={editor.isActive('orderedList')}
                        onClick={() =>
                            editor.chain().focus().toggleOrderedList().run()
                        }
                    >
                        <FormatListNumbered fontSize="small" />
                    </ToggleButton>
                </ToggleButtonGroup>

                <ToggleButtonGroup size="small">
                    <ToggleButton
                        value="link"
                        selected={editor.isActive('link')}
                        onClick={addLink}
                    >
                        <InsertLink fontSize="small" />
                    </ToggleButton>
                    <ToggleButton
                        value="clear"
                        onClick={() =>
                            editor.chain().focus().clearContent().run()
                        }
                    >
                        <DeleteSweep fontSize="small" color="error" />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>

            <EditorContent editor={editor} onBlur={onBlur} />
        </Box>
    );
};
