import { Request, Response } from 'express';
import { getAuthorRequestsService } from '@/service/author/getRequest.service';
import { ApiResponse } from '@/shared/apiResponse';

export class GetAuthorRequestsController {
  public async get(req: Request, res: Response) {
    const requests = await getAuthorRequestsService.get();

    res.status(201).json(ApiResponse(201, requests));
  }
}

export const getAuthorRequestsController = new GetAuthorRequestsController();
