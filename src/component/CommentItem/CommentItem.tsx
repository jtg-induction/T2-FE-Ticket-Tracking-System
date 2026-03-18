import { useEffect, useState } from 'react';

import { Link } from 'react-router';
import { Markdown } from 'tiptap-markdown';

import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';

import { CustomIconButton, RichTextEditor } from '@component';
import { useUpdateCommentMutation } from '@service';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { convertIsoToDateYear } from '@util';

import { CommentItemProps } from './CommentItem.types';

export const CommentItem = ({
    comment,
    ticketId,
    onDelete,
}: CommentItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editMessage, setEditMessage] = useState(comment.message);
    const [updateComment, { isLoading: isUpdating }] =
        useUpdateCommentMutation();

    const {
        commentator,
        created_at: createdAt,
        can_edit: canEdit,
        id: commentId,
    } = comment;
    const date = new Date(createdAt);

    const time = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    const viewer = useEditor({
        editable: false,
        content: comment.message,
        extensions: [StarterKit, Markdown],
    });

    useEffect(() => {
        if (viewer && !isEditing) {
            viewer.commands.setContent(comment.message);
        }
    }, [comment.message, viewer, isEditing]);

    const handleSave = async () => {
        await updateComment({
            ticketId,
            commentId,
            body: { message: editMessage },
        }).unwrap();
        setIsEditing(false);
    };

    return (
        <Stack direction="row" spacing={2}>
            <Tooltip title={commentator.email}>
                <Avatar
                    component={Link}
                    to={`/profile/${commentator.user_id}`}
                    sx={{ textDecoration: 'none' }}
                >
                    {commentator.first_name[0]}
                    {commentator.last_name[0]}
                </Avatar>
            </Tooltip>

            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                >
                    <Stack direction="row" spacing={2}>
                        <Typography
                            component={Link}
                            to={`/profile/${commentator.user_id}`}
                            variant="subtitle2"
                            fontWeight={700}
                            color="textPrimary"
                            sx={{ textDecoration: 'none' }}
                        >
                            {commentator.first_name} {commentator.last_name}
                        </Typography>
                        <Tooltip title={time}>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                {convertIsoToDateYear(createdAt)}
                            </Typography>
                        </Tooltip>
                    </Stack>

                    {canEdit && !isEditing && (
                        <Stack direction="row" spacing={0.5} ml="auto">
                            <CustomIconButton
                                variant="standard"
                                size="small"
                                onClick={() => setIsEditing(true)}
                                disabled={isUpdating}
                            >
                                <EditOutlined fontSize="inherit" />
                            </CustomIconButton>
                            <CustomIconButton
                                variant="standard"
                                size="small"
                                color="error"
                                onClick={() => onDelete(commentId)}
                            >
                                <DeleteOutline fontSize="inherit" />
                            </CustomIconButton>
                        </Stack>
                    )}
                </Stack>

                {isEditing ? (
                    <Box sx={{ mt: 1 }}>
                        <RichTextEditor
                            value={editMessage}
                            onChange={setEditMessage}
                        />
                        <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="flex-end"
                            sx={{ mt: 1 }}
                        >
                            <Button
                                variant="outlined"
                                size="small"
                                color="error"
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditMessage(comment.message);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                                onClick={() => void handleSave()}
                                disabled={isUpdating || !editMessage.trim()}
                            >
                                {isUpdating ? (
                                    <CircularProgress
                                        size={16}
                                        color="inherit"
                                    />
                                ) : (
                                    'Save'
                                )}
                            </Button>
                        </Stack>
                    </Box>
                ) : (
                    // Using sx intentionally as Tiptap injects ProseMirror class dynamically
                    <Box
                        borderRadius="0 16px 16px 16px"
                        border="2px solid"
                        borderColor="divider"
                        sx={{
                            backgroundColor: 'background.default',
                            '& .ProseMirror': {
                                marginBlock: -2,
                                paddingInline: 2,
                            },
                        }}
                    >
                        <EditorContent editor={viewer} />
                    </Box>
                )}
            </Box>
        </Stack>
    );
};
