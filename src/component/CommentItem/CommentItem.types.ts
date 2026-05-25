import { Comment } from '@type/comment.types';

export type CommentItemProps = {
    comment: Comment;
    ticketId: string;
    onDelete: (id: string) => void;
};
