import { Request, Response } from 'express';

import { asyncHandler } from '@/middlewares/asyncHandler';
import { getAllBlogService } from '@/service/blog/getAll.service';
import { ApiResponse } from '@/shared/apiResponse';

// ?limit=10&offset=0
export class GetAllBlogController {
  public getAll = asyncHandler(async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;

    const result = await getAllBlogService.getAll(limit, offset);

    res.status(200).json(ApiResponse(200, result));
  });
}

export const getAllBlogController = new GetAllBlogController();
