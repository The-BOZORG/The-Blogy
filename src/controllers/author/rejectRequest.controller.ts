import { Request, Response } from 'express';
import { rejectAuthorRequestService } from '@/service/author/rejectRequest.service';
import { ApiResponse } from '@/shared/apiResponse';

export class RejectAuthorRequestController {
  public async handle(req: Request, res: Response) {
    const { requestId } = req.params as { requestId: string };

    const result = await rejectAuthorRequestService.execute(requestId);

    res.status(201).json(ApiResponse(201, result));
  }
}

export const rejectAuthorRequestController =
  new RejectAuthorRequestController();
