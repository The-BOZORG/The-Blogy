import { Request, Response } from 'express';

import { asyncHandler } from '@/middlewares/asyncHandler';
import { ApiResponse } from '@/shared/apiResponse';
import { createBlogService } from '@/service/blog/create.service';

export class CreateBlogController {
  public createBlog = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user.id;
    const body = req.body;

    const result = await createBlogService.createBlog(userId, body);

    res.status(201).json(ApiResponse(201, result, 'create blog success'));
  });
}

export const createBlogController = new CreateBlogController();
