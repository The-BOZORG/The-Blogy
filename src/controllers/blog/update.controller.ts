import { Request, Response } from 'express';

import { asyncHandler } from '@/middlewares/asyncHandler';
import { ApiResponse } from '@/shared/apiResponse';
import { updateBlogService } from '@/service/blog/update.service';

export class UpdateBlogController {
  public updateBlog = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user.id;
    const blogId = req.params.blogId as string;
    const body = req.body;
    const file = req.file;

    const result = await updateBlogService.blogUpdate(
      userId,
      blogId,
      body,
      file,
    );

    res.status(201).json(ApiResponse(201, result, 'update blog success'));
  });
}

export const updateBlogController = new UpdateBlogController();
