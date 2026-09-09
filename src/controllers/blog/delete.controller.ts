import { Request, Response } from 'express';

import { asyncHandler } from '@/middlewares/asyncHandler';
import { ApiResponse } from '@/shared/apiResponse';
import { deleteBlogService } from '@/service/blog/delete.service';

export class DeleteBlogController {
  public deleteBlog = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user.id;
    const role = req.user.role;
    const blogId = req.params.blogId as string;

    await deleteBlogService.deleteBlog(userId, blogId, role);

    res.status(200).json(ApiResponse(200, null, 'blog deleted successfully'));
  });
}

export const deleteBlogController = new DeleteBlogController();
