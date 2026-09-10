import { Request, Response } from 'express';
import { authorRequestsService } from '@/service/author/authorRequest.service';
import { ApiResponse } from '@/shared/apiResponse';

export class AuthorRequestsController {
  public async createRequest(req: Request, res: Response) {
    const userId = req.user.id;
    const { reason } = req.body;

    const request = await authorRequestsService.authorRequest(userId, reason);

    res
      .status(201)
      .json(ApiResponse(201, request, 'author request created success'));
  }
}

export const authorRequestsController = new AuthorRequestsController();
