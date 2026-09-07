import { Request, Response } from 'express';

import { asyncHandler } from '@/middlewares/asyncHandler';
import { ApiResponse } from '@/shared/apiResponse';
import { getAllService } from '@/service/users/getAll.service';

// ?limit=10&offset=0
export class GetAllController {
  public getAll = asyncHandler(async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);

    const result = await getAllService.getAll(
      req.cookies.session_id,
      limit,
      offset,
    );

    res.status(200).json(ApiResponse(200, result));
  });
}

export const getAllController = new GetAllController();
