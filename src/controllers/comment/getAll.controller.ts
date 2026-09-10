import { Request, Response } from 'express';

import { asyncHandler } from '@/middlewares/asyncHandler';
import { getAllCommentService } from '@/service/comment/getAll.service';
import { ApiResponse } from '@/shared/apiResponse';

// ?limit=10&offset=0
export class GetAllCommentController {
  public getAll = asyncHandler(async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;

    const result = await getAllCommentService.getAll(limit, offset);

    res.status(200).json(ApiResponse(200, result));
  });
}

export const getAllCommentController = new GetAllCommentController();
