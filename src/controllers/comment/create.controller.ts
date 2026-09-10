import { Request, Response } from 'express';

import { asyncHandler } from '@/middlewares/asyncHandler';
import { ApiResponse } from '@/shared/apiResponse';
import { createCommentService } from '@/service/comment/create.service';

export class CreateCommentController {
  public createComment = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user.id;
    const { content } = req.body;
    const blogId = req.blog.id;

    const result = await createCommentService.createComment(
      userId,
      content,
      blogId,
    );

    res.status(201).json(ApiResponse(201, result, 'create comment success'));
  });
}

export const createCommentController = new CreateCommentController();
