import { asyncHandler } from '@/middlewares/asyncHandler';
import { myBlogService } from '@/service/blog/me.service';
import { ApiResponse } from '@/shared/apiResponse';
import { Request, Response } from 'express';

export class MyBlogController {
  public myBlog = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user.id;
    const blog = await myBlogService.myBlog(userId);

    res.status(201).json(ApiResponse(201, blog));
  });
}
export const myBlogController = new MyBlogController();
