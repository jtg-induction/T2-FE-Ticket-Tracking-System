import { useEffect, useState } from 'react';

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
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
} from '@mui/material';

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
    const [linkDialogOpen, setLinkDialogOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');

    const editor = useEditor({
        extensions: [
            StarterKit.configure(),
            Underline,
            Link.configure({ openOnClick: false, autolink: true }),
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

    useEffect(() => {
        if (editor && value === '' && !editor.isEmpty) {
            editor.commands.setContent('');
        }
    }, [value, editor]);

    if (!editor) return null;

    const openLinkDialog = () => {
        const attributes = editor.getAttributes('link') as { href?: string };
        setLinkUrl(attributes.href ?? '');
        setLinkDialogOpen(true);
    };

    const handleLinkConfirm = () => {
        if (linkUrl === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
        } else {
            const normalised =
                linkUrl &&
                !/^https?:\/\//i.test(linkUrl) &&
                !linkUrl.startsWith('/')
                    ? `https://${linkUrl}`
                    : linkUrl;
            editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: normalised })
                .run();
        }
        setLinkDialogOpen(false);
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
                    <Tooltip title="Bold" arrow placement="top">
                        <ToggleButton
                            value="bold"
                            selected={editor.isActive('bold')}
                            onClick={() =>
                                editor.chain().focus().toggleBold().run()
                            }
                        >
                            <FormatBold fontSize="small" />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Italic" arrow placement="top">
                        <ToggleButton
                            value="italic"
                            selected={editor.isActive('italic')}
                            onClick={() =>
                                editor.chain().focus().toggleItalic().run()
                            }
                        >
                            <FormatItalic fontSize="small" />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Underline" arrow placement="top">
                        <ToggleButton
                            value="underline"
                            selected={editor.isActive('underline')}
                            onClick={() =>
                                editor.chain().focus().toggleUnderline().run()
                            }
                        >
                            <FormatUnderlined fontSize="small" />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Strikethrough" arrow placement="top">
                        <ToggleButton
                            value="strike"
                            selected={editor.isActive('strike')}
                            onClick={() =>
                                editor.chain().focus().toggleStrike().run()
                            }
                        >
                            <StrikethroughS fontSize="small" />
                        </ToggleButton>
                    </Tooltip>
                </ToggleButtonGroup>

                <ToggleButtonGroup size="small">
                    <Tooltip title="Bullet List" arrow placement="top">
                        <ToggleButton
                            value="bulletList"
                            selected={editor.isActive('bulletList')}
                            onClick={() =>
                                editor.chain().focus().toggleBulletList().run()
                            }
                        >
                            <FormatListBulleted fontSize="small" />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Numbered List" arrow placement="top">
                        <ToggleButton
                            value="orderedList"
                            selected={editor.isActive('orderedList')}
                            onClick={() =>
                                editor.chain().focus().toggleOrderedList().run()
                            }
                        >
                            <FormatListNumbered fontSize="small" />
                        </ToggleButton>
                    </Tooltip>
                </ToggleButtonGroup>

                <ToggleButtonGroup size="small">
                    <Tooltip title="Insert Link" arrow placement="top">
                        <ToggleButton
                            value="link"
                            selected={editor.isActive('link')}
                            onClick={openLinkDialog}
                        >
                            <InsertLink fontSize="small" />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Clear Content" arrow placement="top">
                        <ToggleButton
                            value="clear"
                            disabled={editor.isEmpty}
                            onClick={() =>
                                editor.chain().focus().clearContent().run()
                            }
                        >
                            <DeleteSweep
                                fontSize="small"
                                color={editor.isEmpty ? 'disabled' : 'error'}
                            />
                        </ToggleButton>
                    </Tooltip>
                </ToggleButtonGroup>
            </Stack>

            <EditorContent editor={editor} onBlur={onBlur} />

            <Dialog
                open={linkDialogOpen}
                onClose={() => setLinkDialogOpen(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Insert Link</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        size="small"
                        label="URL"
                        placeholder="https://example.com"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === 'Enter' && handleLinkConfirm()
                        }
                        sx={{ mt: 1 }}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setLinkDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleLinkConfirm}>
                        {linkUrl === '' ? 'Remove Link' : 'Insert'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
