import { asyncHandler } from '@/middlewares/asyncHandler';
import { deleteBlogService } from '@/service/blog/delete.service';
import { ApiResponse } from '@/shared/apiResponse';
import { Request, Response } from 'express';

export class DeleteBlogController {
  public deleteUser = asyncHandler(async (req: Request, res: Response) => {
    await deleteBlogService.DeleteBlogService(req.user.id);

    res.status(200).json(ApiResponse(200, null, 'user deleted successfully'));
  });
}

export const deleteBlogController = new DeleteBlogController();
