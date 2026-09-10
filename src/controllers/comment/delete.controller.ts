import { Request, Response } from 'express';

import { asyncHandler } from '@/middlewares/asyncHandler';
import { ApiResponse } from '@/shared/apiResponse';
import { deleteCommentService } from '@/service/comment/delete.service';

export class DeleteCommentController {
  public deleteComment = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user.id;
    const role = req.user.role;
    const commentId = req.params.commentId as string;

    await deleteCommentService.deleteComment(userId, commentId, role);

    res
      .status(200)
      .json(ApiResponse(200, null, 'comment deleted successfully'));
  });
}

export const deleteCommentController = new DeleteCommentController();
