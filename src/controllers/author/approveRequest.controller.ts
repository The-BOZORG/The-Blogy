import { Request, Response } from 'express';
import { approveAuthorRequestService } from '@/service/author/approveRequest.service';
import { ApiResponse } from '@/shared/apiResponse';

export class ApproveRequestController {
  public async handle(req: Request, res: Response) {
    const { requestId } = req.params as { requestId: string };

    const result = await approveAuthorRequestService.execute(requestId);

    res.status(201).json(ApiResponse(201, result));
  }
}

export const approveRequestController = new ApproveRequestController();
